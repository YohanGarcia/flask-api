from flask import request, jsonify
from app import app
from models.piesadb import *

@app.route("/piesas", methods=['POST'])
def piesa():
    if request.method == 'POST': 
        name = request.json['name']
        newPiesa = Piesa(name=name)

        db.session.add(newPiesa)
        db.session.commit()
        print('resivido')
        return piesa_schema.jsonify(newPiesa) 

    allPiesa = Piesa.query.all()
    return piesas_schema.jsonify(allPiesa)

@app.route("/piesas", methods=['GET'])
def getPiesas():
    all_piesas = Piesa.query.all()
    return piesas_schema.jsonify(all_piesas)

@app.route("/piesas/<int:id>", methods=['GET'])
def getPiesa(id):
    res = Piesa.query.get(id)
    return piesa_schema.jsonify(res)

@app.route("/piesas/<int:id>", methods=['DELETE'])
def deletPiesa(id):
    if request.method == 'DELETE':
        piesa = Piesa.query.get(id)
        db.session.delete(piesa)
        db.session.commit()
        print(f'borrado: {piesa}')
        return piesa_schema.jsonify(piesa)
    
@app.route("/piesas/<int:id>", methods=['PUT'])
def updatePiesa(id):
    if request.method == 'PUT':
        piesa = Piesa.query.get(id)
        name = request.json['name']
        piesa.name = name
        db.session.commit()
        print('actualizado')
        return piesa_schema.jsonify(piesa)
