import React, { Component, Fragment } from 'react';

import { NUEVO_CLIENTE } from '../../mutations/index';
import { Mutation } from 'react-apollo';


import { Form, Select, Input, Button, message, Icon } from 'antd';

const { Option } = Select;

const success = () => {
    message.success('Cliente creado correctamente', [2]);
};
    
const error = () => {
    message.error('Todos los campos son obligatorios',  [2]);
    
};


class NuevoCliente extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: false,
            email: '',
            emails: []
        }
    };

    leerCampo = (i) => (e) => {
        console.log(i);
        console.log(e.target.value);

        const nuevoEmail = this.state.emails.map((email, index) => {
            if(i !== index) return email;
            return {
                ...email,
                email: e.target.value
            }
        });
        this.setState({
            emails: nuevoEmail
        })
    }

    nuevoCampo = () => {
        this.setState({
            emails: this.state.emails.concat([{email: ''}])
        })
    }

    quitarCampo = (i) => () => {
        console.log(i);
        this.setState({
            emails: this.state.emails.filter((email, index) => i !== index)
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="block">
            <h1>Nuevo Cliente</h1>
                <Mutation 
                    mutation={NUEVO_CLIENTE}
                    onCompleted={ () => this.props.history.push('/')}
                >

                { crearCliente => (

                
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} 
                onSubmit={
                    e => {
                        e.preventDefault();

                        this.props.form.validateFields((err, values) => {
                            if (!err) {
                                console.log(values);
    
                                const {nombre, apellido, empresa, tipo } = values;
                                
                                const { emails } = this.state;

                                const input = {
                                    nombre,
                                    apellido,
                                    empresa,
                                    emails,
                                    tipo
                                }; 
    
                                crearCliente({
                                    variables: {input}
                                }, success())



                            } else {
                                error()
                            }
                        });

                    }
                }>
                
                    <Form.Item
                        label="Nombre"
                    >
                        {getFieldDecorator('nombre', {
                            rules: [{ required: true, message: 'Añade un nombre!' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Apellido"
                    >
                        {getFieldDecorator('apellido', {
                            rules: [{ required: true, message: 'Añade un apellido' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Empresa"
                    >
                        {getFieldDecorator('empresa', {
                            rules: [{ required: true, message: 'Añade una empresa' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    
                    {
                        this.state.emails.map((email, index) => (
                            
                            <Form.Item
                                key={index}
                                label="Email"
                            >
                                {getFieldDecorator('email', {
                                    rules: [{ required: false, message: 'Añade un Email' }],
                                })(
                                    <Fragment>
                                        <Input onChange={this.leerCampo(index)} />
                                        <Button

                                            onClick={this.quitarCampo(index)}
                                        >
                                        <Icon type="delete" />
                                            Eliminar 
                                        </Button>
                                    </Fragment>
                                )}
                            </Form.Item>
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
                        label="Tipo"
                    >
                        {getFieldDecorator('tipo', {
                            rules: [{ required: true, message: 'Añade un tipo de cliente!' }],
                        })(
                            <Select
                            placeholder="Selecciona una opción"
                        
                            >
                                <Option value="PREMIUM">PREMIUM</Option>
                                <Option value="BASICO">BÁSICO</Option>
                            </Select>
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
            )}
                </Mutation>
            </div>
        );
    }
}
const WrappedApp = Form.create({ name: 'coordinated' })(NuevoCliente);
export default WrappedApp;