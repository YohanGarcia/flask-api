from flask import request, jsonify
from app import app
from models.vehiculodb import Vehiculo, vehiculos_schema

@app.route("/")
def home():
    regis = Vehiculo.query.all()
    res = vehiculos_schema.dump(regis)
    return jsonify({ 'cliente': res})