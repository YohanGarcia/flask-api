from flask import request, jsonify
from app import app, fecha, hora
from models.clientedb import *

@app.route('/clientes', methods=['POST'])
def createCliente(): 
    if request.method == 'POST':
        name = request.json['name']
        telefono = request.json['telefono']
    
        new_cliente = Cliente(name = name, telefono=telefono, fecha=fecha, hora=hora)
        
        db.session.add(new_cliente)
        db.session.commit()

        return cliente_schema.jsonify(new_cliente)
    else:
        return 'ERROR al enviar los datos'

@app.route('/clientes', methods=['GET'])
def getClientes():
    all_clientes = Cliente.query.all() 
    
    return clientes_schema.jsonify(all_clientes)


@app.route('/clientes/<int:id>', methods=['GET'])
def getCliente(id):
    result = Cliente.query.get(id) 
    return cliente_schema.jsonify(result)

@app.route('/clientes/<int:id>', methods=['DELETE'])
def deleteCliente(id):
    cliente = Cliente.query.get(id)
    db.session.delete(cliente)
    db.session.commit()
    return cliente_schema.jsonify(cliente)

@app.route('/clientes/<int:id>', methods=['PUT'])
def updateCliente(id):
    cliente = Cliente.query.get(id)

    name = request.json['name']
    telefono = request.json['telefono']
    
    cliente.name = name
    cliente.telefono = telefono

    db.session.commit()
    return cliente_schema.jsonify(cliente)