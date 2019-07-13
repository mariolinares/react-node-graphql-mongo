import React, { Component, Fragment } from 'react';
import {Button, Input} from 'antd'

class Producto extends Component {
    state = {

    }
    render() {

        const { producto } = this.props;
        //console.log(producto);
        return (
            <Fragment>
                <tr>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio} €</td>
                    <td>{producto.stock}</td>
                    <td>
                        <Input 
                            onChange={ e => this.props.actualizarCantidad(e.target.value, this.props.index) }
                            
                        />
                    </td>
                    <td>
                        <Button
                            onClick={e => this.props.eliminarProducto(producto.id)}
                            >Eliminar</Button>
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default Producto;