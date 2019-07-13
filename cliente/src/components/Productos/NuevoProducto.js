import React, { Component, Fragment } from 'react';

import { NUEVO_PRODUCTO } from '../../mutations/index';
import { Mutation } from 'react-apollo';


import { Form, Input, Button, message, Icon, Select } from 'antd';
const Option = Select.Option;

const success = () => {
    message.success('Producto creado correctamente', [2]);
};
    
const error = () => {
    message.error('Todos los campos son obligatorios',  [2]);
};


class NuevoProducto extends Component {
    constructor(props){
        super(props);
        this.state = {
            atributos: [],
            datos: []
        }
    };



    nuevoCampo = () => {
        this.setState({
            atributos: this.state.atributos.concat([{}])
        })
    }

    /* leerCampo = (i) => (e) => {
        console.log(i);
        console.log(e.target.value);

        const nuevoAtributo = this.state.atributos.map((atributo, index) => {
            if(i !== index) return atributo;
            return {
                ...atributo,
                atributo: e.target.value
            }
        });
        this.setState({
            atributos: nuevoAtributo
        }) 
    } */

    handleChange = (e) => {
        console.log(e.target.id)
        const fname = e.target.name;
        const fvalue = e.target.value;
        console.log(fname, fvalue)
        this.props.form.setFieldsValue({
            [fname]: fvalue
        });
        this.setState({
            datos: {
                [fname]: fvalue
            }
        })
    }

    quitarCampo = (i) => () => {
        console.log(i);
        this.setState({
            atributos: this.state.atributos.filter((atributo, index) => i !== index)
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="block">
            <h1>Nuevo Producto</h1>
                <Mutation 
                    mutation={NUEVO_PRODUCTO}
                    onCompleted={ () => this.props.history.push('/productos')}
                >

                { nuevoProducto => (

                
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} 
                onSubmit={
                    e => {
                        e.preventDefault();

                        this.props.form.validateFields((err, values) => {
                            if (!err) {
              
    
                                const {nombre, descripcion, precio, stock } = values;

                                const input = {
                                    nombre,
                                    descripcion,
                                    precio: Number(precio),
                                    stock: Number(stock)
                                }; 

                                nuevoProducto({
                                    variables: {input}
                                }, success())

                                this.props.form.resetFields();

                            } else {
                                error()
                            }
                        });
                            
                    }
                }>
                
                    <Form.Item
                        label="nombre"
                    >
                        {getFieldDecorator('nombre', {
                            rules: [{ required: true, message: 'Añade un nombre!' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Descripcion"
                    >
                        {getFieldDecorator('descripcion', {
                            rules: [{ required: true, message: 'Añade una descripción' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Precio"
                    >
                        {getFieldDecorator('precio', {
                            rules: [{ required: true, message: 'Añade un precio' }],
                        })(
                            
                            <Input type="number"/>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Stock"
                    >
                        {getFieldDecorator('stock', {
                            rules: [{ required: true, message: 'Añade un stock!' }],
                        })(
                            <Input  />
                        )}
                    </Form.Item>

                    
                    {
                        this.state.atributos.map((atributo, index) => (
                        
                        <Fragment key={index}>
                            <Form.Item key={index} label="First Name">
                                {getFieldDecorator("firstName", {
                                    
                                    rules: [
                                    {
                                        required: true
                                    }
                                    ]
                                })(
                                <Select
                                    placeholder="First Name"
                                    required
                                    onChange={this.handleChange}
                                />
                                    )}
                            </Form.Item>

                            <Form.Item label="Last Name">
                                {getFieldDecorator("lastName", {
                                    rules: [
                                    {
                                        required: true
                                    }
                                    ]
                                })(
                                    <Input
                                        placeholder="Last Name"
                                        required
                                        onChange={this.handleChange}
                                    />
                                )}
                            </Form.Item>
                        </Fragment>
                        )) 
                    }


                    <div className="ant-row ant-form-item">
                        <div className="ant-col ant-col-5 ant-form-item-label">
                        </div>
                        <div className="ant-col ant-col-12 ant-form-item-control-wrapper">
                            <Button
                                onClick={this.nuevoCampo}
                                type="primary" 
                                className="mario" 
                            > 
                                <Icon type="plus" />
                                Añadir Email
                            </Button>
                        </div>
                    </div>

                    <Form.Item
                        wrapperCol={{ span: 12, offset: 5 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                    </Form.Item>
                </Form>

            )}
                </Mutation>
            </div>
        );
    }
}
const WrappedApp = Form.create()(NuevoProducto);
export default WrappedApp;