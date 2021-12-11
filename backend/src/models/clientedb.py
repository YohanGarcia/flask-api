from models.confModeldb import db, ma

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    telefono = db.Column(db.String)

    fecha = db.Column(db.String)
    hora = db.Column(db.String)

    def __init__(self, name, telefono, fecha, hora):
        self.name = name
        self.telefono = telefono
        self.fecha = fecha
        self.hora = hora

class ClienteSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Cliente
    id = ma.auto_field()
    name = ma.auto_field()
    telefono = ma.auto_field()
    fecha = ma.auto_field()
    hora = ma.auto_field()

cliente_schema = ClienteSchema()
clientes_schema = ClienteSchema(many=True)
