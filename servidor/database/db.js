import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clientes', {useNewUrlParser: true});

mongoose.set('setFindAndModify', false);

// Definir el Schema de clientes 

const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array,
    tipo: String,
    pedidos: Array
});

const Clientes = mongoose.model('clientes', clientesSchema);

const productosSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    atributos: Array   
    
});

const Productos = mongoose.model('productos', productosSchema);


const perdidosSchema = new mongoose.Schema({
    pedido: Array,
    total: Number,
    fecha: Date,
    cliente: String,
    estado: String
});

const Pedidos = mongoose.model('Pedidos', perdidosSchema);


const facturasSchema = new mongoose.Schema({
    numero: Number,
    fecha: String,
    referencia: Number,
    cliente: String,
    misDatos: String,
    lineas: Array,
    baseImponible: Number,
    recargoEquivalencia: Number,
    retencion: Number,
    formaDePago: String
});

const Facturas = mongoose.model('facturas', facturasSchema);



export { Clientes, Productos, Pedidos, Facturas};
