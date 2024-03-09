from flask import request
from flask_restx import Namespace, Resource, fields

from src.controller.auth import token_required
from ...model.user import User
from ...model.trip import Trip
from ...model.financials.group_payments import GroupPaymentLendees

outstanding_payments_api = Namespace(
    "financials", "User trip financials API", path="/trips"
)


@outstanding_payments_api.route(
    "/<string:trip_uuid>/financials/outstanding/lender/<string:lender_uuid>"
)
class OutstandingPaymentsLendee(Resource):
    """RETRIEVE LIST"""

    @token_required
    def get(self, current_user_auth, trip_uuid, lender_uuid):
        trip = Trip.get_by_uuid(trip_uuid)
        if not trip or not trip.contains_user(current_user_auth.user_id):
            return {"success": False, "msg": "Trip not found."}, 400

        lender = User.get_by_uuid(uuid=lender_uuid)
        if not lender:
            return {"success": False, "msg": "Lender not found"}, 400

        outstanding_payments = GroupPaymentLendees.get_all_by_user_id(user_id=lender.id)

        return {"success": True, "payments": outstanding_payments}, 200


# @outstanding_payments_api.route(
#     "/<string:trip_uuid>/financials/outstanding/lender/<string:lender_uuid>/lendee/<string:lendee_uuid>"
# )
# class OutstandingPaymentsLendee(Resource):
#     """RETRIEVE BY LENDER / LENDEE"""

#     @token_required
#     def get(self, current_user_auth, trip_uuid, lender_uuid, lendee_uuid):
#         trip = Trip.get_by_uuid(trip_uuid)
#         if not trip or not trip.contains_user(current_user_auth.user_id):
#             return {"success": False, "msg": "Trip not found."}, 400

#         lender = User.get_by_uuid(uuid=lender_uuid)
#         if not lender:
#             return {"success": False, "msg": "Lender not found"}, 400

#         lendee = User.get_by_uuid(uuid=lendee_uuid)
#         if not lendee:
#             return {"success": False, "msg": "Lendee not found"}, 400

#         outstanding_payments = OutstandingPayment.get_by_lender_lendee_id(
#             trip_id=trip.id, lender_id=lender.id, lendee_id=lendee.id
#         )

#         return {"success": True, "payments": outstanding_payments.toJSON()}, 200
