from flask import request
from flask_restx import Resource, fields
import jwt
from datetime import datetime, timezone, timedelta
import os

from .. import api
from .models import UserAuth, db

signup_model = api.model(
    "SignUpModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)


@api.route("/register", methods=["POST"])
class Register(Resource):
    @api.expect(signup_model, validate=True)
    def post(self):
        if request.method == "POST":
            body = request.get_json()
            _email = body.get("email")
            _password = body.get("password")

            user = UserAuth.get_by_email(_email)

            if user:
                return {
                    "success": False,
                    "msg": "An account with this email has already been created.",
                }, 400

            new_user = UserAuth(email=_email)
            new_user.set_password(_password)

            # create access token uwing JWT
            token = jwt.encode(
                {"email": _email, "exp": datetime.utcnow() + timedelta(minutes=30)},
                os.getenv("JWT_SECRET_KEY"),
            )

            new_user.set_jwt_auth_active(True)
            new_user.save()

            return {"success": True, "token": token}, 200

        else:
            return "Method is Not Allowed"


login_model = api.model(
    "LoginModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)


@api.route("/login", methods=["POST"])
class Login(Resource):
    @api.expect(login_model, validate=True)
    def post(self):
        if request.method == "POST":
            body = request.get_json()
            _email = body.get("email")
            _password = body.get("password")

            user = UserAuth.get_by_email(_email)
            if not user:
                return {"success": False, "msg": "Email or password is invalid"}, 400

            is_password_valid = user.check_password(_password)
            if not user or not is_password_valid:
                return {"success": False, "msg": "Email or password is invalid"}, 400

            # create access token uwing JWT
            token = jwt.encode(
                {"email": _email, "exp": datetime.utcnow() + timedelta(minutes=30)},
                os.getenv("JWT_SECRET_KEY"),
            )

            user.set_jwt_auth_active(True)
            user.save()

            return {"success": True, "token": token}, 200

        else:
            return "Method is Not Allowed"


@api.route("/logout")
class LogoutUser(Resource):
    """
    Logs out User using 'logout_model' input
    """

    # @token_required
    # def post(self, current_user):
    def post(self):

        token = request.headers["authorization"].split(" ")[1]

        # jwt_block = JWTTokenBlocklist(jwt_token=_jwt_token, created_at=datetime.now(timezone.utc))
        # jwt_block.save()
        try:
            data = jwt.decode(token, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
            current_user = UserAuth.get_by_email(data["email"])

            if not current_user:
                return {
                    "success": False,
                    "msg": "Sorry. Wrong auth token. This user does not exist.",
                }, 400

            # token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            # if token_expired is not None:
            #     return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400
            current_user.set_jwt_auth_active(False)
            current_user.save()
        except:
            return {"success": False, "msg": "Token is invalid"}, 400

        return {"success": True}, 200
