import mongoose from 'mongoose';
import {Clientes, Productos, Pedidos, Facturas} from './db';
import { rejects } from 'assert';


export const resolvers = {
    Query: {
        getClientes: (root, {limite, offset}) => {
            return Clientes.find({}).limit(limite).skip(offset)
        },
        getCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Clientes.findById(id, (error, cliente) => {
                    if (error) {
                        rejects(error)
                    } else {
                        resolve(cliente)
                    }
                })
            });
        },
        totalClientes: (root) => {
            return new Promise((resolve, object) => {
                Clientes.countDocuments({}, (error, count) => {
                    if(error) reject(error)
                    else resolve(count)
                })
            })
        }, 
        obtenerProductos: (root, {limite, offset}) => {
            return Productos.find({}).limit(limite).skip(offset)
        },
        obtenerProducto: (root, {id}) => {
            return new Promise((resolve, object) => {
                Productos.findById(id, (error, producto) => {
                    if (error) {
                        rejects(error)
                    } else {
                        resolve(producto)
                    }
                })
            });
        }
    },
    Mutation: {
        crearCliente: (root, {input}) => {
            const nuevoCliente = new Clientes({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                emails: input.emails,
                tipo: input.tipo,
                pedidos: input.pedidos,
            });
            nuevoCliente.id = nuevoCliente._id;
            
            
            return new Promise((resolve, object) => {
                nuevoCliente.save((error) => {
                    if(error) {
                        rejects(error)
                    }
                    else {
                        resolve(nuevoCliente)
                    }
                })
            });
        },
        actualizarCliente: (root, {input}) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndUpdate({ _id : input.id } , input, {new: true}, (error, cliente) => {
                    if(error) {
                        rejects(error)
                    }
                    else {
                        resolve(cliente)
                    }
                })
            });
        },
        eliminarCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndDelete({_id: id}, (error) => {
                    if(error){
                        rejects(error)
                    } else {
                        resolve('Registro: ' + id + 'eliminado correctamente');
                    }
                })
            })
        },
        nuevoProducto: (root, {input}) => {
            const nuevoProducto = new Productos({
                nombre: input.nombre,
                descripcion: input.descripcion,
                precio: input.precio,
                stock: input.stock,
                atributos: input.atributos,
            });

            nuevoProducto.id = nuevoProducto._id;

            return new Promise((resolve, object) => {
                nuevoProducto.save((error) => {
                    if(error) {
                        rejects(error)
                    }
                    else {
                        resolve(nuevoProducto)
                    }
                })
            });
        },
        actualizarProducto: (root, {input}) => {
            return new Promise((resolve, object) => {
                Productos.findOneAndUpdate({ _id : input.id } , input, {new: true}, (error, producto) => {
                    if(error) {
                        rejects(error)
                    }
                    else {
                        resolve(producto)
                    }
                })
            });
        },
        eliminarProducto: (root, {id}) => {
            return new Promise((resolve, object) => {
                Productos.findOneAndDelete({_id: id}, (error) => {
                    if(error){
                        rejects(error)
                    } else {
                        resolve('Registro: ' + id + 'eliminado correctamente');
                    }
                })
            })
        },

        nuevoPedido: (root, {input}) => {
            const nuevoPedido = new Pedidos({
                pedido: input.pedido,
                total: input.total,
                fecha: new Date(),
                cliente: input.cliente,
                estado: "PENDIENTE"
            })

            nuevoPedido.id = nuevoPedido._id;

            return new Promise((resolve, object) => {
                nuevoPedido.save((error) => {
                    if(error) rejects(error)
                    else resolve(nuevoPedido)
                })
            })
        },



        nuevaFactura: (root, {input}) => {
            const nuevaFactura = new Facturas({
                numero: input.numero,
                fecha: input.fecha,
                referencia: input.referencia,
                cliente: input.cliente,
                misDatos: input.misDatos,
                lineas: input.lineas,
                baseImponible: input.baseImponible,
                recargoEquivalencia: input.recargoEquivalencia,
                retencion: input.retencion,
                formaDePago: input.formaDePago 
            });

            nuevaFactura.id = nuevaFactura._id;

            return new Promise((resolve, object) => {
                nuevaFactura.save((error) => {
                    if(error) {
                        rejects(error)
                    }
                    else {
                        resolve(nuevaFactura)
                    }
                })
            });
        },
    }
}