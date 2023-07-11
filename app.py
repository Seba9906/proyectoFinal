from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://Seba9906:1259BCAA@Seba9906.mysql.pythonanywhere-services.com/Seba9906$default'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

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


class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    clave = db.Column(db.String(100))
    email = db.Column(db.String(100))
    telefono = db.Column(db.String(20))

    def __init__(self, nombre, clave, email, telefono):
        self.nombre = nombre
        self.clave = clave
        self.email = email
        self.telefono = telefono

with app.app_context():
    db.create_all()

class ProductosSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'precio', 'stock', 'motor', 'cilindrada', 'imagen')

class ClientesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'clave', 'email', 'telefono')

producto_schema = ProductosSchema()
productos_schema = ProductosSchema(many=True)
cliente_schema = ClientesSchema()
clientes_schema = ClientesSchema(many=True)

@app.route('/productos', methods=['GET'])
def get_productos():
    all_productos = Producto.query.all()
    result = productos_schema.dump(all_productos)
    return jsonify(result)

@app.route('/productos/<id>', methods=['GET'])
def get_producto(id):
    producto = Producto.query.get(id)
    return producto_schema.jsonify(producto)

@app.route('/productos', methods=['POST'])
def create_producto():
    nombre = request.json['nombre']
    precio = request.json['precio']
    stock = request.json['stock']
    motor = request.json['motor']
    cilindrada = request.json['cilindrada']
    imagen = request.json['imagen']
    new_producto = Producto(nombre, precio, stock, motor, cilindrada, imagen)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)

@app.route('/productos/<id>', methods=['PUT'])
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

@app.route('/productos/<id>', methods=['DELETE'])
def delete_producto(id):
    producto = Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)

@app.route('/clientes', methods=['GET'])
def get_clientes():
    all_clientes = Cliente.query.all()
    result = clientes_schema.dump(all_clientes)
    return jsonify(result)

@app.route('/clientes/<id>', methods=['GET'])
def get_cliente(id):
    cliente = Cliente.query.get(id)
    return cliente_schema.jsonify(cliente)

@app.route('/clientes', methods=['POST'])
def create_cliente():
    nombre = request.json['nombre']
    clave = request.json['clave']
    email = request.json['email']
    telefono = request.json['telefono']
    new_cliente = Cliente(nombre, clave, email, telefono)
    db.session.add(new_cliente)
    db.session.commit()
    return cliente_schema.jsonify(new_cliente)

@app.route('/clientes/<id>', methods=['PUT'])
def update_cliente(id):
    cliente = Cliente.query.get(id)
    cliente.nombre = request.json['nombre']
    cliente.clave = request.json['clave']
    cliente.email = request.json['email']
    cliente.telefono = request.json['telefono']
    db.session.commit()
    return cliente_schema.jsonify(cliente)

@app.route('/clientes/<id>', methods=['DELETE'])
def delete_cliente(id):
    cliente = Cliente.query.get(id)
    db.session.delete(cliente)
    db.session.commit()
    return cliente_schema.jsonify(cliente)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
