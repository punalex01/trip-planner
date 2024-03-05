from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from . import db


class User(db.Model):
    __tablename__ = "users"

    # Auto Generated Fields:
    id = db.Column(db.Integer(), primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4)
    # The Date of the Instance Creation => Created one Time when Instantiation
    created = db.Column(db.DateTime(timezone=True), default=datetime.now)
    # The Date of the Instance Update => Changed with Every Update
    updated = db.Column(
        db.DateTime(timezone=True), default=datetime.now, onupdate=datetime.now
    )

    # Input by User Fields:
    name = db.Column(db.String(100), nullable=False, unique=False)
    email = db.Column(db.String(100), nullable=False, unique=True)

    # mapped tables
    auth_user = relationship("UserAuth", backref="users", uselist=False)
    trips = relationship("Trip", backref="users", uselist=True)

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def get_by_uuid(cls, uuid):
        return cls.query.filter_by(uuid=uuid).first()

    def get_trips(self):
        return self.trips

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def toDict(self):
        cls_dict = {}
        cls_dict["name"] = self.name
        cls_dict["email"] = self.email
        cls_dict["uuid"] = str(self.uuid)
        return cls_dict

    def toJSON(self):
        return self.toDict()

    def __repr__(self):
        return "<%r>" % self.email
