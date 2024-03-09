from flask import request
from flask_restx import Namespace, Resource, fields

from src.controller.auth import token_required
from ...model.user import User
from ...model.trip import Trip
from ...model.financials.group_payments import GroupPayments, GroupPaymentLendees

group_payments_api = Namespace("financials", "User trip financials API", path="/trips")

add_lendee_model = group_payments_api.model(
    "LendeeModel",
    {
        "lendee": fields.String(required=True),  # email of user (TODO: switch to UUID)
        "amount": fields.Float(required=True),
        "isReturned": fields.Boolean(required=True),
    },
)

add_payment_model = group_payments_api.model(
    "AddPaymentModel",
    {
        "name": fields.String(required=True, min_length=1, max_length=64),
        "date": fields.Date(required=True),
        "lender": fields.String(required=True),  # email of user (TODO: switch to UUID)
        "total": fields.Float(required=True),
        "lendees": fields.List(fields.Nested(add_lendee_model, attribute="items")),
    },
)


@group_payments_api.route("/<string:trip_uuid>/financials/payment")
class GroupPayment(Resource):

    @group_payments_api.expect(add_payment_model, validate=True)
    @token_required
    def post(self, current_user_auth, trip_uuid):
        body = request.get_json()
        trip = Trip.get_by_uuid(trip_uuid)
        if not trip or not trip.contains_user(current_user_auth.user_id):
            return {"success": False, "msg": "Trip not found"}, 400

        lender = User.get_by_email(body.get("lender"))
        if not lender:
            return {"success": False, "msg": "Lender not found"}, 400

        new_payment = GroupPayments(
            name=body.get("name"),
            date=body.get("date"),
            lender=lender,
            total=body.get("total"),
            is_returned=False,
        )

        lendee_payments = body.get("lendees")
        for payment in lendee_payments:
            lendee = User.get_by_email(payment.get("lendee"))
            if not lendee or not trip.contains_user(lendee.id):
                return {"success": False, "msg": "Lendee not found"}, 400

            new_gpl = GroupPaymentLendees(
                lendee=lendee,
                is_returned=payment.get("isReturned"),
                amount=payment.get("amount"),
            )

            new_payment.lendees.append(new_gpl)

        trip.group_payments.append(new_payment)
        trip.save()
        payments = [payment.toJSON() for payment in trip.group_payments]

        return {"success": True, "payments": payments}, 200

    @token_required
    def get(self, current_user_auth, trip_uuid):
        try:
            trip = Trip.get_by_uuid(trip_uuid)
            if not trip or not trip.contains_user(current_user_auth.user_id):
                return {"success": False, "msg": "Trip not found"}, 400
            payments = [payment.toJSON() for payment in trip.group_payments]
            return {"success": True, "payments": payments}, 200

        except:
            return {"success": False, "msg": "Unable to retrieve payments."}, 400


@group_payments_api.route(
    "/<string:trip_uuid>/financials/payment/<string:payment_uuid>"
)
class GroupPayment(Resource):
    @group_payments_api.expect(add_payment_model, validate=True)
    @token_required
    def put(self, current_user_auth, trip_uuid, payment_uuid):
        try:
            body = request.get_json()
            trip = Trip.get_by_uuid(current_user_auth.user_id, trip_uuid)
            if not trip or not trip.contains_user(current_user_auth.user_id):
                return {"success": False, "msg": "Trip not found"}, 400

            payment = GroupPayments.get_by_uuid(trip.trip_id, payment_uuid)
            if not payment:
                return {"success": False, "msg": "Payment not found"}, 400

            lender = User.get_by_email(body.get("lender"))
            if not lender:
                return {"success": False, "msg": "Lender not found"}, 400

            is_returned = True

            lendee_payments = body.get("lendees")
            new_lendee_payments = []
            for l_payment in lendee_payments:
                lendee = User.get_by_email(l_payment.get("lendee"))
                if not lendee:
                    return {"success": False, "msg": "Lendee not found"}, 400

                if not l_payment.get("isReturned"):
                    is_returned = False

                gpl = GroupPaymentLendees.get_by_lendee_id(lendee.id)
                if not gpl:
                    new_lendee_payments.append(
                        GroupPaymentLendees(
                            lendee=lendee,
                            is_returned=l_payment.get("isReturned"),
                            amount=l_payment.get("amount"),
                        )
                    )
                else:
                    gpl.update(
                        {
                            "is_returned": l_payment.get("isReturned"),
                            "amount": l_payment.get("amount"),
                        }
                    )
                    new_lendee_payments.append(gpl)

            update_payment_data = {
                "name": body.get("name"),
                "date": body.get("date"),
                "lender": lender,
                "total": body.get("total"),
                "is_returned": is_returned,
                "lendees": new_lendee_payments,
            }
            payment.update(update_payment_data)
            payment.save()
            payments = [payment.toJSON() for payment in trip.group_payments]

            return {"success": True, "payments": payments}, 200
        except:
            return {"success": False, "msg": "Unable to update payment."}, 400

    @token_required
    def delete(self, current_user_auth, trip_uuid, payment_uuid):
        try:
            trip = Trip.get_by_uuid(trip_uuid)
            if not trip or not trip.contains_user(current_user_auth.user_id):
                return {"success": False, "msg": "Trip not found"}, 400

            curr_payment = GroupPayments.get_by_uuid(trip.id, payment_uuid)
            if not curr_payment:
                return {"success": False, "msg": "Payment not found"}, 400

            curr_payment.delete()

            payments = [payment.toJSON() for payment in trip.group_payments]
            return {"success": True, "payments": payments}, 200
        except:
            return {"success": False, "msg": "Unable to delete payment."}, 400


update_is_returned_model = group_payments_api.model(
    "UpdateIsReturnedModel",
    {"isReturned": fields.Boolean(required=True)},
)


@group_payments_api.route(
    "/<string:trip_uuid>/financials/payment/<string:payment_uuid>/lendee/<string:lendee_uuid>"
)
class GroupPaymentLendee(Resource):
    @group_payments_api.expect(update_is_returned_model, validate=True)
    @token_required
    def patch(self, current_user_auth, trip_uuid, payment_uuid, lendee_uuid):
        try:
            body = request.get_json()
            trip = Trip.get_by_uuid(current_user_auth.user_id, trip_uuid)
            if not trip or not trip.contains_user(current_user_auth.user_id):
                return {"success": False, "msg": "Trip not found"}, 400

            payment = GroupPayments.get_by_uuid(trip.id, payment_uuid)
            if not payment:
                return {"success": False, "msg": "Payment not found"}, 400

            lendee = User.get_by_uuid(lendee_uuid)
            if not lendee:
                return {"success": False, "msg": "Lendee not found"}, 400

            lendee_payment = GroupPaymentLendees.get_by_lendee_id(
                payment.payment_id, lendee.id
            )
            if not lendee_payment:
                return {"success": False, "msg": "Lendee payment not found"}, 400

            lendee_payment.is_returned = body.get("isReturned")
            lendee_payment.save()

            is_returned = True
            for lp in payment.lendees:
                if not lp.is_returned:
                    is_returned = False

            payment.update({"is_returned": is_returned})
            payment.save()
            payments = [payment.toJSON() for payment in trip.group_payments]

            return {"success": True, "payments": payments}, 200
        except:
            return {"success": False, "msg": "Unable to update 'isReturned' value"}, 400
