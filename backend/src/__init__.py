import os
from flask import Blueprint, Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restx import Api, Resource, fields
from flask_cors import CORS

from .model import db
from .config import config
from src.controller.auth import auth_api
from src.controller.trips import trips_api

migrate = Migrate()

app = Flask(__name__, instance_relative_config=True)
cors = CORS(app)
app.config.from_object(config["development"])

db.init_app(app)
migrate.init_app(app, db)

api_bp = Blueprint("api", __name__, url_prefix="/api")
api = Api(api_bp, version="1.0", title="Users API")

api.add_namespace(auth_api, path="/auth")
api.add_namespace(trips_api, path="/trips")

app.register_blueprint(api_bp)
