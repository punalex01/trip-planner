import collections
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, case
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from ..trip import Trip
from src.model.user import User

from .. import db


class GroupPayments(db.Model):
    __tablename__ = "group_payments"

    # Auto Generated Fields:
    trip_id = db.Column(db.Integer(), ForeignKey(Trip.id))
    id = db.Column(db.Integer(), primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4)
    # The Date of the Instance Creation => Created one Time when Instantiation
    created = db.Column(db.DateTime(timezone=True), default=datetime.now)
    # The Date of the Instance Update => Changed with Every Update
    updated = db.Column(
        db.DateTime(timezone=True), default=datetime.now, onupdate=datetime.now
    )

    # Input by User Fields:
    name = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date(), nullable=False)
    is_returned = db.Column(db.Boolean(), nullable=False)
    lender_id = db.Column(db.Integer(), ForeignKey(User.id))
    lender = relationship("User", uselist=False)
    total = db.Column(db.Float(), nullable=False)
    lendees = relationship(
        "GroupPaymentLendees",
        cascade="all,delete",
        back_populates="group_payment",
        uselist=True,
    )

    @classmethod
    def get_by_user_id(cls, user_id):
        return cls.query.filter_by(cls.lender.has(id=user_id))

    @classmethod
    def get_by_uuid(cls, trip_id, payment_uuid):
        return cls.query.filter_by(trip_id=trip_id, uuid=payment_uuid).first()

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
        cls_dict["name"] = self.name
        cls_dict["date"] = str(self.date)
        cls_dict["is_returned"] = self.is_returned
        cls_dict["lender"] = self.lender.toJSON()
        cls_dict["lender_id"] = self.lender_id
        cls_dict["total"] = self.total
        cls_dict["lendees"] = [lendee.toJSON() for lendee in self.lendees]
        cls_dict["uuid"] = str(self.uuid)
        return cls_dict

    def toJSON(self):
        return self.toDICT()

    def __repr__(self):
        return "<%r, %r>" % self.name, self.lendee


class GroupPaymentLendees(db.Model):
    __tablename__ = "group_payment_lendees"

    id = db.Column(db.Integer(), primary_key=True)
    # Auto Generated Fields:
    uuid = db.Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4)
    # The Date of the Instance Creation => Created one Time when Instantiation
    created = db.Column(db.DateTime(timezone=True), default=datetime.now)
    # The Date of the Instance Update => Changed with Every Update
    updated = db.Column(
        db.DateTime(timezone=True), default=datetime.now, onupdate=datetime.now
    )

    # Input by User Fields:
    lendee_id = db.Column(db.Integer(), ForeignKey(User.id))
    lendee = relationship("User", uselist=False)
    is_returned = db.Column(db.Boolean(), nullable=False)
    amount = db.Column(db.Float(), nullable=False)
    payment_id = db.Column(db.Integer(), ForeignKey(GroupPayments.id))
    group_payment = relationship(
        "GroupPayments", back_populates="lendees", uselist=False
    )

    @classmethod
    def get_by_lendee_id(cls, lendee_id):
        return cls.query.filter_by(lendee_id).first()

    @classmethod
    def get_by_uuid(cls, uuid):
        return cls.query.filter_by(uuid=uuid).first()

    @classmethod
    def get_by_lendee_id(cls, payment_id, lendee_id):
        return cls.query.filter_by(payment_id=payment_id, lendee_id=lendee_id).first()

    @classmethod
    def get_all_by_user_id(cls, user_id):

        user1_lender_query = cls.query.filter(cls.group_payment.has(lender_id=user_id))
        user1_lendee_query = cls.query.filter_by(lendee_id=user_id)

        payments = user1_lender_query.union_all(user1_lendee_query).all()

        user_payments = collections.defaultdict(list)
        for p in payments:
            id = (
                p.lendee.id
                if p.group_payment.lender_id == user_id
                else p.group_payment.lender_id
            )
            user_payments[id].append(p)

        payments = []
        for id in user_payments:
            if id == user_id:
                continue
            total = 0
            for p in user_payments[id]:
                amount = -p.amount if p.lendee_id == user_id else p.amount
                total += amount
            user = (
                user_payments[id][-1].lendee
                if user_payments[id][-1].lendee_id != user_id
                else user_payments[id][-1].group_payment.lender
            )
            payments.append(
                {
                    "user": user.toJSON(),
                    "total": total,
                    "payments": [
                        {
                            "payment_name": p.group_payment.name,
                            "isReturned": p.is_returned,
                            "amount": p.amount,
                            "isLendee": p.lendee.id != user_id,
                        }
                        for p in user_payments[id]
                    ],
                }
            )

        return payments

    def update(self, new_values):
        for key, value in new_values.items():
            setattr(self, key, value)

    def delete(self):
        op = self.outstanding_payment
        db.session.delete(self)
        op.set_total()
        db.session.commit()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):
        cls_dict = {}
        cls_dict["lendee"] = self.lendee.toJSON()
        cls_dict["is_returned"] = self.is_returned
        cls_dict["amount"] = self.amount
        cls_dict["payment_name"] = self.group_payment.name
        cls_dict["date"] = str(self.group_payment.date)
        return cls_dict

    def toJSON(self):
        return self.toDICT()

    def __repr__(self):
        return "<%r, %s>" % (self.lendee, self.amount)
