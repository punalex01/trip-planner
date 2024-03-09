from flask_restx import Namespace

from .auth import auth_api
from .trips import trips_api
from .financials.group_payments import group_payments_api
from .financials.outstanding_payments import outstanding_payments_api
