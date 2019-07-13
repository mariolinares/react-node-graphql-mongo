import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Row, Col, Button, message, Modal } from 'antd';
import { Query, Mutation } from 'react-apollo';
import  { CLIENTES_QUERY } from '../../queries';
import {  ELIMINAR_CLIENTE  } from '../../mutations';

import Paginador from '../Paginador';

import Exito from '../Alertas/Exito';


import {
    Card, Avatar,
    } from 'antd';
    
    const { Meta } = Card;
    const confirm = Modal.confirm;

    const { Column, ColumnGroup } = Table;
    
const columns = [
    {
        title: 'nombre',
        dataIndex: 'nombre',
        key: 'nombre',
    }, 
    {
        title: 'apellido',
        dataIndex: 'apellido',
        key: 'apellido',
    },
    {
        title: 'empresa',
        dataIndex: 'empresa',
        key: 'empresa',
    },

    {
        title: 'tipo',
        dataIndex: 'tipo',
        key: 'tipo',
    },
    {
        title: 'actions',
        dataIndex: 'actions',
        key: 'actions',
    }
];


const success = () => {
    message.success('Cliente eliminado correctamente', [2]);
};


class Clientes extends Component {
    limite = 1000;
    constructor(props){
        super(props);
        this.state = {
            paginador: {
                offset: 0,
                actual: 1
            },
            alerta: {
                mostrar: false,
                mensaje: ''
            }
        }
    }

    paginaAnterior = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        })
    }

    paginaSiguiente = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                actual: this.state.paginador.actual + 1
            }
        })
    }

    render (){

        const {alerta: {mostrar, mensaje} } = this.state;

        const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';


        return (
            <Fragment>
            { alerta }
            <Query query={CLIENTES_QUERY} pollInterval={100} variables={{offset: this.state.paginador.offset, limite: this.limite}}>
            {
                ({ loading, error, data, startPolling, stopPolling  }) => {
                    if (loading) {
                        return "Cargando..."
                    }
                    if(error) {
                        return `Error: ${error.message}`
                    }

                    console.log(data);

                    // rowSelection object indicates the need for row selection
                    const rowSelection = {
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        },
                        getCheckboxProps: record => ({
                            disabled: record.name === 'Disabled User', // Column configuration not to be checked
                            name: record.name,
                        }),
                    };
    

                    return (
                        <Fragment>
                        <div className="block">
                            <div className="d-flex-between">
                                <h2>Listado Clientes</h2>
                                <Link to="/cliente/Nuevo" className="ant-btn ant-btn-primary ant-btn-circle ant-btn-icon-only" > 
                                    <Icon type="plus" />
                                </Link>
                            </div> 


                            <Table className="productos" dataSource={data.getClientes} rowKey='id' >
                                <Column
                                title="Nombre"
                                dataIndex="nombre"
                                key="nombre"
                                />
                                <Column
                                title="Apellido"
                                dataIndex="apellido"
                                key="apellido"
                                />
                                <Column
                                title="Empresa"
                                dataIndex="empresa"
                                key="empresa"
                                />
                                <Column
                                title="Tipo"
                                dataIndex="tipo"
                                key="tipo"
                                />
                                <Column
                                title="Acciones"
                                key="action"
                                render={(text, record) => (
                                    <span>

                                        <Link to={`/pedidos/nuevo/${record.id}`} className="ant-btn ant-btn-primary ant-btn-background-ghost">
                                            Nuevo Pedido
                                        </Link>

                                        <Link to={`/cliente/editar/${record.id}`} className="ant-btn ant-btn-background-ghost btn-edit">
                                            Editar
                                        </Link>

                            
                                        <Mutation 
                                            mutation={ELIMINAR_CLIENTE}
                                            onCompleted={ (data) => {
                                                this.setState({
                                                alerta: {
                                                    mostrar: true,
                                                    mensaje: data.eliminarCliente
                                                }
                                                })
                                            }} 
                                        >
                                            {eliminarCliente => {
                                                const id = record.id;
                                                return (
                                                <Button type="danger" ghost 
                                                    onClick={ () => {
                                                        confirm({
                                                        title: '¿Estás seguro?',
                                                        content: 'Una vez elimado el cliente no podrá recuperarse.',
                                                        onOk() {
                                                            eliminarCliente({
                                                            variables: {id}
                                                            })
                                                        },
                                                        onCancel() {
                                                            console.log('Cancel');
                                                        },
                                                    });

                                                    }}> 
                                                        Eliminar 
                                                </Button>
                                                )
                                            }}
                                        </Mutation>

                                    </span>
                                )}
                                />
                            </Table>
                


                        </div>
                        <div className="block"> 
                            <Row gutter={32}>                        
                                {
                                data.getClientes.map(cliente => (                                
                                    <Col key={cliente.id} xs={24} sm={24} md={24}>
                                        <Card className="card" style={{ marginTop: -1 }} key={cliente.id}>
                                            <div className="card-content">
                                            <div className="dflex-start">
                                            <h4>Nombre</h4>
                                                <h4>{cliente.nombre} {cliente.apellido}</h4>
                                                <span>{cliente.empresa}</span>
                                            </div>
                                            <div className="dflex-start">
                                                {
                                                    (cliente.emails.length === 0) ? "" : (cliente.emails.length >= 2) ? <h4>Emails</h4> : <h4>Email</h4>
                                                    
                                                }
                                                {
                                                    
                                                    cliente.emails.map((email, index) => {
                                                        return <div key={index}>{email.email}</div>
                                                    })
                                                }
                                            </div>
                                                
                                                <div className="dflex-end">
                                                <Link to={`/pedidos/nuevo/${cliente.id}`} className="ant-btn">
                                                    Nuevo Pedido
                                                </Link>
                                                <Mutation 
                                                    mutation={ELIMINAR_CLIENTE}
                                                    onCompleted={ (data) => {
                                                        this.setState({
                                                        alerta: {
                                                            mostrar: true,
                                                            mensaje: data.eliminarCliente
                                                        }
                                                        })
                                                    }}
                                                >
                                                    { 
                                                        eliminarCliente  => {
                                                            const { id } = cliente;
                                                            return (
                                                                <Button icon="user-delete" type="danger" ghost
                                                                    onClick={() => {

                                                                        confirm({
                                                                            title: '¿Estás seguro?',
                                                                            content: 'Una vez elimado el cliente no podrá recuperarse.',
                                                                            onOk() {
                                                                                eliminarCliente({
                                                                                    variables: {id}
                                                                                })
                                                                            },
                                                                            onCancel() {
                                                                                console.log('Cancel');
                                                                            },
                                                                        });

                                                                    }}    
                                                                > 
                                                                    Eliminar
                                                                </Button>
                                                            )
                                                        }
                                                    }
                                                </Mutation>
                                                <div className="card-footer">
                                                    <Link to={`/cliente/editar/${cliente.id}`} className="ant-btn">
                                                    <Icon type="edit" /> Editar
                                                    </Link>
                                                </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                ))
                                }
                            </Row>
                            <Paginador 
                                    actual={this.state.paginador.actual}
                                    totalClientes={data.totalClientes}
                                    limite={this.limite}
                                    paginaAnterior={this.paginaAnterior}
                                    paginaSiguiente={this.paginaSiguiente}
                            />
                        </div>        
                        </Fragment>
                        )
                }
            } 
        </Query>
        </Fragment>
        )
    }
}

export default Clientes;