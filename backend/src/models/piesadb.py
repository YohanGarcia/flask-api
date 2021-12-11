from models.confModeldb import db, ma

class Piesa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    
    def __init__(self, name):
        self.name = name

class PiesaSchena(ma.SQLAlchemySchema):
    class Meta:
        model = Piesa
    id = ma.auto_field()
    name = ma.auto_field()

piesa_schema = PiesaSchena()
piesas_schema = PiesaSchena(many=True)