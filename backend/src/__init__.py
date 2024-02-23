import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restx import Api, Resource, fields

from .config import config

db = SQLAlchemy()
migrate = Migrate()

app = Flask(__name__, instance_relative_config=True)
app.config.from_object(config["development"])

db.init_app(app)
migrate.init_app(app, db)

api = Api(version="1.0", title="Users API")
api.init_app(app)
