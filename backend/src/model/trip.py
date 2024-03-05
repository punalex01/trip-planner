from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey
from datetime import datetime
import uuid
from sqlalchemy.orm import relationship

from src.model.user import User

from . import db


class Trip(db.Model):
    __tablename__ = "trips"

    # Auto Generated Fields:
    user_id = db.Column(db.Integer(), ForeignKey(User.id))
    trip_id = db.Column(db.Integer(), primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4)
    # The Date of the Instance Creation => Created one Time when Instantiation
    created = db.Column(db.DateTime(timezone=True), default=datetime.now)
    # The Date of the Instance Update => Changed with Every Update
    updated = db.Column(
        db.DateTime(timezone=True), default=datetime.now, onupdate=datetime.now
    )

    # Input by User Fields:
    name = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.Date(), nullable=False)
    end_date = db.Column(db.Date(), nullable=False)
    description = db.Column(db.String(), nullable=False)

    group_payments = relationship("GroupPayments", backref="trips", uselist=True)

    @classmethod
    def get_by_uuid(cls, user_id, uuid):
        return cls.query.filter_by(user_id=user_id).filter_by(uuid=uuid).first()

    def update(self, new_values):
        for key, value in new_values.items():
            setattr(self, key, value)

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):
        cls_dict = {}
        cls_dict["uuid"] = self.uuid
        cls_dict["name"] = self.name
        cls_dict["start_date"] = str(self.start_date)
        cls_dict["end_date"] = str(self.end_date)
        cls_dict["description"] = self.description
        cls_dict["uuid"] = str(self.uuid)

        return cls_dict

    def toJSON(self):
        return self.toDICT()

    def __repr__(self):
        return "<%r>" % self.name
