from functools import wraps
from flask import request
from flask_restx import Namespace, Resource, fields
import jwt
from datetime import datetime, timedelta, timezone
import os

from src.model.user import User

from ..model import db
from ..model.auth import UserAuth, JWTTokenBlocklist

auth_api = Namespace("auth", "User authentication API", path="/auth")

"""
   Helper function for JWT token required
"""


def token_required(f):

    @wraps(f)
    def decorator(self, *args, **kwargs):

        token = None

        if "authorization" in request.headers:
            bearer, token = request.headers["authorization"].split(" ")
            if bearer != "Bearer":
                return {"success": False, "msg": "Authorization header is invalid"}, 400

        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        try:
            data = jwt.decode(token, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
            current_user = UserAuth.get_by_email(data["email"])

            if not current_user:
                return {
                    "success": False,
                    "msg": "This user does not exist.",
                }, 400

            token_expired = (
                db.session.query(JWTTokenBlocklist.id)
                .filter_by(jwt_token=token)
                .scalar()
            )

            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400

        except:
            return {"success": False, "msg": "Token is invalid"}, 400

        return f(self, current_user, *args, **kwargs)

    return decorator


signup_model = auth_api.model(
    "SignUpModel",
    {
        "name": fields.String(required=True, min_length=1, max_length=64),
        "email": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)


@auth_api.route("/register", methods=["POST"])
class Register(Resource):
    @auth_api.expect(signup_model, validate=True)
    def post(self):
        if request.method == "POST":
            body = request.get_json()
            _name = body.get("name")
            _email = body.get("email")
            _password = body.get("password")

            user = User.get_by_email(_email)

            if user:
                return {
                    "success": False,
                    "msg": "An account with this email has already been created.",
                }, 400

            new_user = User(name=_name, email=_email)
            new_user.auth_user = UserAuth(email=_email, users=new_user)
            new_user.auth_user.set_password(_password)

            # create access token using JWT
            token = jwt.encode(
                {"email": _email, "exp": datetime.utcnow() + timedelta(minutes=30)},
                os.getenv("JWT_SECRET_KEY"),
            )

            new_user.auth_user.set_jwt_auth_active(True)
            new_user.save()

            return {"success": True, "token": token}, 200

        else:
            return "Method is Not Allowed"


login_model = auth_api.model(
    "LoginModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)


@auth_api.route("/login", methods=["POST"])
class Login(Resource):
    @auth_api.expect(login_model, validate=True)
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


@auth_api.route("/logout")
class LogoutUser(Resource):
    """
    Logs out User using 'logout_model' input
    """

    @token_required
    def post(self, current_user):

        _jwt_token = request.headers["authorization"].split(" ")[1]

        jwt_block = JWTTokenBlocklist(
            jwt_token=_jwt_token, created_at=datetime.now(timezone.utc)
        )
        jwt_block.save()

        self.set_jwt_auth_active(False)
        self.save()

        return {"success": True}, 200
