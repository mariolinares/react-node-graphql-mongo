import React, { Component, Fragment } from 'react';

import Producto from './Producto';

const Resumen = (props) => {

        const productos = props.productos;

        return (
            <Fragment>
                <table className="table mt-3">
                    <thead>
                        <tr className="">
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Cantidad</th>
                            <th>Eliminar</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {
                            productos.map((producto, index) => (
                                <Producto
                                    key={producto.id}
                                    id={producto.id}
                                    producto={producto}
                                    index={index}
                                    actualizarCantidad={props.actualizarCantidad}
                                    eliminarProducto={props.eliminarProducto}
                                />
                            ))
                        }
                    
                    </tbody>
                </table>
            </Fragment>
        );
    }

export default Resumen;