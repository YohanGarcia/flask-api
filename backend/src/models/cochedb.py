from models.confModeldb import db, ma

class Coche(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    
    def __init__(self, name):
        self.name = name

class CocheSchena(ma.SQLAlchemySchema):
    class Meta:
        model = Coche
    id = ma.auto_field()
    name = ma.auto_field()

coche_schema = CocheSchena()
coches_schema = CocheSchena(many=True)