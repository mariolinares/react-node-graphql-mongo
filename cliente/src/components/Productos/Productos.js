import React, { Component } from 'react';
import {Query, Mutation} from 'react-apollo';
import {OBTENER_PRODUCTOS} from '../../queries';
import {ELIMINAR_PRODUCTO} from '../../mutations';

import {Link} from 'react-router-dom';
import { Table, Divider, Tag, Modal, Button } from 'antd';

import Exito from '../Alertas/Exito';

const confirm = Modal.confirm;
const { Column, ColumnGroup } = Table;


class Productos extends Component {

  state = { 
    visible: false ,
    alerta: {
      mostrar: false,
      mensaje: ''
    }
  }

  eliminar = (record) => {
    console.log(record);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  }


  
  render() {

    const {alerta: {mostrar, mensaje} } = this.state;

    const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';
    return (
      <div className="block">
        <h1>Productos</h1>

        { alerta }

        <Query query={OBTENER_PRODUCTOS} pollInterval={100}>
        {
            ({ loading, error, data, startPolling, stopPolling  }) => {
                if (loading) {
                    return "Cargando..."
                }
                if(error) {
                    return `Error: ${error.message}`
                }

                console.log(data);

                return (
                  <Table className="productos" dataSource={data.obtenerProductos} rowKey='id' >
                    <Column
                      title="Nombre"
                      dataIndex="nombre"
                      key="nombre"
                    />
                    <Column
                      title="Descripción"
                      dataIndex="descripcion"
                      key="descripcion"
                    />
                    <Column
                      title="Precio"
                      dataIndex="precio"
                      key="precio"
                    />
                    <Column
                      title="Stock"
                      dataIndex="stock"
                      key="stock"
                    />
                    <Column
                      title="Acciones"
                      key="action"
                      render={(text, record) => (
                        <span>
                          <Link className="ant-btn" to={`/productos/editar/${record.id}`}>
                            Editar
                          </Link>

                          
                          <Mutation 
                              mutation={ELIMINAR_PRODUCTO}
                              onCompleted={ (data) => {
                                this.setState({
                                  alerta: {
                                    mostrar: true,
                                    mensaje: data.eliminarProducto
                                  }
                                })
                              }} 
                          >
                              {eliminarProducto => {
                                const id = record.id;
                                return (
                                  <Button type="danger" ghost onClick={ () => {
                                    confirm({
                                      title: '¿Estás seguro?',
                                      content: 'Una vez elimado el producto no podrá recuperarse.',
                                      onOk() {
                                        eliminarProducto({
                                          variables: {id}
                                        })
                                      },
                                      onCancel() {
                                        console.log('Cancel');
                                      },
                                    });
                                   
                                  }} >Eliminar </Button>
                                )
                              }}
                          </Mutation>

                          
                        </span>
                      )}
                    />
                  </Table>
                )    
          }
        }
        </Query>
      </div>
    )
  }
}
export default Productos;