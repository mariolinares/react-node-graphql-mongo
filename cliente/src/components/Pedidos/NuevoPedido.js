import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {OBTENER_PRODUCTOS} from '../../queries';
import DatosCliente from './DatosCliente';
import {Row, Col, Spin} from 'antd';
import PedidoContenido from './PedidoContenido';

export default class NuevoPedido extends Component {

    state = {

    }

    render() {

        const {id} = this.props.match.params;

        return (
        <div className="block">
            <h1>Nuevo Pedido</h1>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <DatosCliente id={id}/>
                </Col>
                <Col xs={24} sm={12} md={12} lg={18}>
                    <Query query={OBTENER_PRODUCTOS}>
                        {({loading, error, data}) => {
                            if (loading) return <Spin />;
                            if (error) return `Error: ${error}`

                            //console.log(data.obtenerProductos);

                            return (
                                <PedidoContenido 
                                    productos={data.obtenerProductos}
                                    id={id}
                                />
                            )
                        }}
                    </Query>
                </Col>
            </Row>
        </div>
        )
    }
}

