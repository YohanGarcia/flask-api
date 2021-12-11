from flask import jsonify, request
from app import app, fecha, hora
from models.vehiculodb import *
from models.clientedb import Cliente
from models.cochedb import Coche

@app.route("/cliente-coche", methods=['GET', 'POST'])
def clienteCoche():
    if request.method == 'POST':
        placa = request.json['placa']
        año = request.json['año']
        color = request.json['color']
        cliente = request.json['name']
        cocche = request.json['coche']
        
        clienteId= Cliente.query.filter_by(name=cliente).first()
        print(clienteId)
        coccheId = Coche.query.filter_by(name=cocche).first()

        newVehiculo = Vehiculo(cliente_id=clienteId.id,
                                coche_id = coccheId.id,
                                placa=placa,
                                año=año,
                                color=color, 
                                hora=hora,
                                fecha=fecha)
        db.session.add(newVehiculo)
        db.session.commit()
        print('resivido')
        return vehiculo_schema.jsonify(newVehiculo)

    vehiculo = Vehiculo.query.all()

    return vehiculos_schema.jsonify(vehiculo)

@app.route("/cliente-coche", methods=['GET'])
def getClienteCoches():
    all_piesas = Vehiculo.query.all()
    return vehiculos_schema.jsonify(all_piesas)

@app.route("/cliente-coche/<int:id>", methods=['GET'])
def getClienteCoche(id):
    res = Vehiculo.query.get(id)
    return vehiculo_schema.jsonify(res)

@app.route("/cliente-coche/<int:id>", methods=['DELETE'])
def deletClienteCoche(id):
    if request.method == 'DELETE':
        res = Vehiculo.query.get(id)
        db.session.delete(res)
        db.session.commit()
        print(f'borrado: {res}')
        return vehiculo_schema.jsonify(res)
    
@app.route("/cliente-coche/<int:id>", methods=['PUT'])
def updateClienteCoche(id):
    if request.method == 'PUT':
        res = Vehiculo.query.get(id)
        name = request.json['name']
        Vehiculo.name = name
        db.session.commit()
        print('actualizado')
        return vehiculo_schema.jsonify(res)