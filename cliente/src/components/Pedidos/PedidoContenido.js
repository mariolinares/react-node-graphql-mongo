import React, { Component, Fragment } from 'react';
import {Row, Col} from 'antd';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import Resumen from './Resumen';



export default class PedidoContenido extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: [],
            total: 0
        }
        console.log('tspl: ', this.state.productos.length)
    }

    actualizarTotal = () => {

        const productos = this.state.productos;

        if(productos.length === 0){
            this.setState({
                total: nuevoTotal
            });
            return;
        }

        let nuevoTotal = 0

        // Calcular cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        this.setState({
            total: nuevoTotal
        })
    }
    
    seleccionarProducto = (productos) => {
        if(productos.length === 0){
            this.setState({
                total: 0
            });
            return;
        }

        this.setState({
            productos: productos
        })
        // console.log(productos);
    }

    actualizarCantidad = (cantidad, index) => {

        const productos = this.state.productos;

        // Agregar cantidades al array
        productos[index].cantidad = Number(cantidad);
        
        this.setState({
            productos: productos
        }, () => {
            this.actualizarTotal();
        })

    }

    eliminarProducto = (id) => {
        const productos = this.state.productos;
        const productosRestantes = productos.filter(producto => producto.id !== id);

        this.setState({
            productos: productosRestantes
        }, () => {
            this.actualizarTotal();
        })
    }


    render() {
        return (
        <Fragment>
            <Row>
                <Col xs={24}>
                    <Select
                        onChange={this.seleccionarProducto}
                        options={this.props.productos}
                        isMulti={true}
                        placeholder="Seleccionar productos"
                        components={Animated()}
                        getOptionValue={(options) => options.id}
                        getOptionLabel={(options) => options.nombre}
                        value={this.state.productos}
                    />   
                    
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Resumen 
                        productos={this.state.productos}
                        actualizarCantidad={this.actualizarCantidad}
                        eliminarProducto={this.eliminarProducto}
                    />
                </Col>
                <Col xs={24}>
                    <div className="dflex-right">
                        <span>{this.state.total} €</span>
                    </div>
                </Col>
            </Row>

        </Fragment>
        )
    }
}
