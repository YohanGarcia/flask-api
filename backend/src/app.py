from flask import Flask, jsonify
from flask_cors import CORS

from config import DevelopmentConfig

from models.confModeldb import db, ma

import datetime

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)

CORS(app)


x = datetime.datetime.now()
fecha = x.strftime("%x")
hora = x.strftime("%X")

from route.cliente import *
from route.piesa import *
from route.coche import *
from route.clienteCoche import *
from route.index import *

if __name__ == '__main__': 
    db.init_app(app)
    ma.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(port=8000)