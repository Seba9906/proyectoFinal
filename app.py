from flask import Flask,jsonify,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS #del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend

#configuro la base de datos, con el nombre de usuario y clave
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://Seba9906:gg!132abccbS@Seba9906.mysql.pythonanywhere-services.com/Seba9906$default'
#URI de la BBDD                         driver de la BD user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #none
db = SQLAlchemy(app)    #crea el objeto db de la clase SQLAlchemy
ma = Marshmallow(app)   #crea el objeto ma de la clase Marshmallow
#defino la tabla
class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    precio = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    motor = db.Column(db.String(12))
    cilindrada = db.Column(db.String(10))
    imagen = db.Column(db.String(400))
    def __init__(self, nombre, precio, stock, imagen, motor, cilindrada):
        self.nombre = nombre
        self.precio = precio
        self.stock = stock
        self.motor = motor
        self.cilindrada = cilindrada
        self.imagen = imagen
        

with app.app_context():
    db.drop_all()
    db.create_all()
class ProductosSchema(ma.Schema):
    class Meta:
        fields = ('id','nombre','precio','stock','motor','cilindrada','imagen')

producto_schema = ProductosSchema()     #El objeto producto_schema es para traer un producto

productos_schema = ProductosSchema(many=True) #EL objeto productos_schema es para traer multiples registros de producto

#crea los endpoint o rutas(json)
@app.route('/productos',methods = ['GET'])
def get_productos():
    all_productos = Producto.query.all()        #el metodo query.all() lo hereda de db.Model
    result = productos_schema.dump(all_productos)   #el metodo dump() lo hereda de ma.schema y trae todos los registros de la tabla
    return jsonify(result)      #retorna un JSON de todos los registros de la tabla
@app.route('/productos/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)
    return producto_schema.jsonify(producto)    #retorna el JSON de un producto recibido como parametro
@app.route('/productos/<id>',methods = ['DELETE'])
def delete_producto(id):
    producto = Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto) #me devuelve un json con el registro eliminado
@app.route('/productos',methods = ['Post']) #crea ruta o endpoint
def create_producto():
    #print(request.json) #request.json contiene el json que envio el cliente
    nombre = request.json['nombre']
    precio = request.json['precio']
    stock = request.json['stock']
    motor = request.json['motor']
    cilindrada = request.json['cilindrada']
    imagen = request.json['imagen']
    new_producto = Producto(nombre,precio,stock,motor,cilindrada,imagen)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)
@app.route('/productos/<id>',methods = ['PUT'])
def update_producto(id):
    producto = Producto.query.get(id)
    producto.nombre = request.json['nombre']
    producto.precio = request.json['precio']
    producto.stock = request.json['stock']
    producto.motor = request.json['motor']
    producto.cilindrada = request.json['cilindrada']
    producto.imagen = request.json['imagen']

    db.session.commit()
    return producto_schema.jsonify(producto)




# if __name__ == '__main__':
#     app.run(debug=True,port=5000) #ejecuta el servidor Flask en el puerto 5000
