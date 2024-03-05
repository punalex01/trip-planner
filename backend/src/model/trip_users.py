from sqlalchemy import ForeignKey
from . import db

TripUsers = db.Table(
    "TripUsers",
    db.Column("id", db.Integer(), primary_key=True),
    db.Column("user_id", db.Integer(), ForeignKey("user.id")),
    db.Column("trip_id", db.Integer(), ForeignKey("trip.id")),
)
