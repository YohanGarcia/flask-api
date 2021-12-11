from flask_sqlalchemy import model
from models.confModeldb import db, ma 
from models.clientedb import Cliente
from models.cochedb import  Coche

class Vehiculo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    placa = db.Column(db.String)
    año = db.Column(db.String)
    color = db.Column(db.String)
    
    fecha = db.Column(db.String)
    hora = db.Column(db.String)

    
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))
    cliente = db.relationship('Cliente', backref=db.backref('vehiculos', lazy=True))

    coche_id = db.Column(db.Integer, db.ForeignKey('coche.id'))
    coche = db.relationship('Coche', backref=db.backref('vehiculos', lazy=True))

    def __init__(self, placa, año, color, fecha, hora, cliente_id, coche_id):
        self.placa = placa
        self.año = año
        self.color = color
        self.fecha = fecha
        self.hora = hora
        self.cliente_id = cliente_id
        self.coche_id = coche_id

class VehiculoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Vehiculo
    id = ma.auto_field()
    placa = ma.auto_field()
    año = ma.auto_field()
    color = ma.auto_field()
    fecha = ma.auto_field()
    hora = ma.auto_field()
    cliente_id = ma.auto_field()
    coche_id = ma.auto_field()



class ClienteCocheSchema(ma.SQLAlchemyAutoSchema):
    class Metal:
        model = Cliente
        include_fk =True

class CocheSchema(ma.SQLAlchemyAutoSchema):
    class Metal:
        model = Coche
        include_fk =True

vehiculo_schema = VehiculoSchema()
vehiculos_schema = VehiculoSchema(many=True)