from flask import request
from flask_restx import Resource, fields

from src.controller.auth import token_required
from . import trips_api
from ..model.trip import Trip
from ..model.user import User

create_trip_model = trips_api.model(
    "CreateTripModel",
    {
        "name": fields.String(required=True, min_length=1, max_length=64),
        "startDate": fields.Date(required=True),
        "endDate": fields.Date(required=True),
        "description": fields.String(required=True),
    },
)


@trips_api.route("/")
class TripsAPI(Resource):
    """
    Create trip
    """

    @trips_api.expect(create_trip_model, validate=True)
    @token_required
    def post(self, current_user_auth):
        try:
            body = request.get_json()
            _name = body.get("name")
            _start_date = body.get("startDate")
            _end_date = body.get("endDate")
            _description = body.get("description")

            new_trip = Trip(
                name=_name,
                start_date=_start_date,
                end_date=_end_date,
                description=_description,
            )

            current_user = User.get_by_id(current_user_auth.user_id)
            current_user.trips.append(new_trip)
            current_user.save()

            trips = [trip.toJSON() for trip in current_user.get_trips()[::-1]]
            return {"success": True, "trips": trips}, 200

        except:
            return {"success": False, "msg": "Trip was unable to be created."}, 400

    @token_required
    def get(self, current_user_auth):
        try:
            current_user = User.get_by_id(current_user_auth.user_id)

            trips = [trip.toJSON() for trip in current_user.get_trips()]
            return {"success": True, "trips": trips}, 200

        except:
            return {"success": False, "msg": "Unable to retrieve trips."}, 400
