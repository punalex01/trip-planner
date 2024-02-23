from sqlalchemy import inspect
from datetime import datetime
from flask_validator import ValidateEmail, ValidateString, ValidateCountry
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash

from .. import db


class UserAuth(db.Model):
    # Auto Generated Fields:
    id = db.Column(db.Integer(), primary_key=True)
    # The Date of the Instance Creation => Created one Time when Instantiation
    created = db.Column(db.DateTime(timezone=True), default=datetime.now)
    # The Date of the Instance Update => Changed with Every Update
    updated = db.Column(
        db.DateTime(timezone=True), default=datetime.now, onupdate=datetime.now
    )

    # Input by User Fields:
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.Text(), nullable=False)
    jwt_auth_active = db.Column(db.Boolean())

    # Validations => https://flask-validator.readthedocs.io/en/latest/index.html
    @classmethod
    def __declare_last__(cls):
        ValidateEmail(
            UserAuth.email, True, True, "The email is not valid. Please check it"
        )  # True => Allow internationalized addresses, True => Check domain name resolution.

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    def toDICT(self):
        cls_dict = {}
        cls_dict["_id"] = self.id
        cls_dict["email"] = self.email

        return cls_dict

    def toJSON(self):
        return self.toDICT()

    # How to serialize SqlAlchemy PostgreSQL Query to JSON => https://stackoverflow.com/a/46180522
    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    def __repr__(self):
        return "<%r>" % self.email
