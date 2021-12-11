from flask import request, jsonify
from app import app
from models.cochedb import *

@app.route("/coches", methods=['POST'])
def coche():
    if request.method == 'POST': 
        name = request.json['name']
        newCoche = Coche(name=name)

        db.session.add(newCoche)
        db.session.commit()
        print('resivido')
        return coche_schema.jsonify(newCoche) 

    res = Coche.query.all()
    return coches_schema.jsonify(res)

@app.route("/coches", methods=['GET'])
def getCoches():
    
    res = Coche.query.all()
    return coches_schema.jsonify(res)

@app.route("/coches/<int:id>", methods=['GET'])
def getCoche(id):
    res = Coche.query.get(id)
    return coche_schema.jsonify(res)

@app.route("/coches/<int:id>", methods=['DELETE'])
def deletCoche(id):
    if request.method == 'DELETE':
        res = Coche.query.get(id)
        db.session.delete(Coche)
        db.session.commit()
        print(f'borrado: {res}')
        return coche_schema.jsonify(res)
    
@app.route("/coches/<int:id>", methods=['PUT'])
def updateCoche(id):
    if request.method == 'PUT':
        res = Coche.query.get(id)
        name = request.json['name']
        Coche.name = name
        db.session.commit()
        print('actualizado')
        return coche_schema.jsonify(res)
