import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import {ACTUALIZAR_PRODUCTO} from '../../mutations';

import { Form, Input, Button, message, Icon, Select } from 'antd';

import { withRouter } from 'react-router-dom';

class FormularioEditarProducto extends Component {
    state = {
        ...this.props.producto.obtenerProducto
    }

    editarProductoForm = (e, actualizarProducto) => {
        e.preventDefault();

        actualizarProducto().then(data => {
            console.log(data);
        })
        
        this.props.form.validateFields((err, values) => {
            if (!err) {

                const {id, nombre, descripcion, precio, stock} = this.state;

            } else {
                console.log(err)
            }
        });

    }


    render() {
        const { nombre, descripcion, precio, stock } = this.state;
        const { id } = this.props;
        const { getFieldDecorator } = this.props.form;

        const input = {
            id,
            nombre: nombre,
            descripcion: descripcion,
            precio: Number(precio),
            stock: Number(stock)
        }

        return (
            <div>
                <Mutation 
                    mutation={ACTUALIZAR_PRODUCTO} 
                    variables={{input}}
                    key={id}
                    onCompleted={() => this.props.refetch().then(() => {
                        this.props.history.push('/productos');
                    })}
                >
                {( actualizarProducto, {loading, error, data }) => {
                    return (
                        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} onSubmit={e => this.editarProductoForm(e, actualizarProducto)}> 
                
                
                    <Form.Item
                        label="nombre"
                    >
                    {getFieldDecorator('nombre', {
                        initialValue: nombre,
                        rules: [{ required: true, message: 'Añade un nombre' }],
                    })(
                            <Input 
                                onChange={ e => {
                                    this.setState({
                                        ...this.state,
                                        nombre: e.target.value
                                        
                                    })
                                }} 
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                    
                        label="Descripcion"
                    >
                    {getFieldDecorator('descripcion', {
                        initialValue: descripcion,
                        rules: [{ required: true, message: 'Añade una descripción' }],
                    })(
                            <Input 
                                onChange={ e => {
                                    this.setState({
                                        ...this.state,
                                        descripcion: e.target.value
                                            
                                    })
                                }} 
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Precio"
                    >
                    {getFieldDecorator('precio', {
                        initialValue: precio,
                        rules: [{ required: true, message: 'Añade un precio' }],
                    })(
                            
                            <Input type="number"
                                onChange={ e => {
                                    this.setState({
                                        ...this.state,
                                        precio: e.target.value
                                            
                                    })
                                }} 
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Stock"
                    >
                        {getFieldDecorator('stock', {
                            initialValue: stock,
                            rules: [{ required: true, message: 'Añade un stock' }],
                        })(
                            <Input type="number"
                                onChange={ e => {
                                    this.setState({
                                        ...this.state,
                                        stock: e.target.value
                                                
                                    })
                                }} 
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ span: 12, offset: 5 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                    </Form.Item>
                </Form>
                    )
                }}
                </Mutation>

            </div>
        )
    }
}


const WrappedApp = Form.create()(FormularioEditarProducto);
export default withRouter(WrappedApp);
