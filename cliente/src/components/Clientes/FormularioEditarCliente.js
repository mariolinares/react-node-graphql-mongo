import React, { Component, Fragment } from 'react';
import {  ACTUALIZAR_CLIENTE  } from '../../mutations';

import { Mutation } from 'react-apollo';

import { withRouter } from 'react-router-dom';


import { Form, Select, Input, Button, message, Icon } from 'antd';
const { Option } = Select;

const success = () => {
    message.success('Cliente modificado correctamente', [2]);
};
    
const error = () => {
    message.error('Todos los campos son obligatorios',  [2]);
    
};

class FormularioEditarCliente extends Component {
    constructor(props){
        super(props);
        this.state = {
            cliente: this.props.cliente,
            emails: this.props.cliente.emails
        }
    }
    

    nuevoCampo = () => {
        this.setState({
            emails: this.state.emails.concat([{email:''}])
        })
    }

    leerCampo = i => e => {
        const nuevoMail = this.state.emails.map((email, index) => {
                if (i !== index) return email;
                return { ...email, email: e.target.value };
        });
        this.setState({ emails: nuevoMail });
    }

    quitarCampo = i => () => {
        this.setState({
            emails: this.state.emails.filter((s, index) => i !== index)
        });
    }



    render() { 

            const {emails} = this.state;

            const {nombre, apellido, empresa, tipo} = this.state.cliente

            const { getFieldDecorator } = this.props.form;
           
            return (
                <Mutation 
                    mutation={ACTUALIZAR_CLIENTE}
                    onCompleted={ () => this.props.refetch().then(() => {
                        this.props.history.push('/')
                    })
                    }
                >
                { actualizarCliente => (
                    
                
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} 
                    onSubmit={
                        e => {
                            e.preventDefault();

                            this.props.form.validateFields((err, values) => {
                                if (!err) {

                                    const {id, nombre, apellido, empresa, tipo} = this.state.cliente;

                                    const {emails} = this.state;

                                    const input = {
                                        id, 
                                        nombre,
                                        apellido, 
                                        emails, 
                                        empresa,
                                        tipo
                                    }
                                    
                                    console.log(input);

                                    actualizarCliente({
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
                            initialValue: nombre,
                            rules: [{ required: true, message: 'Añade un nombre!' }],
                        })(
                            <Input 
                                onChange={ e => {
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            nombre: e.target.value
                                        }
                                    })
                                }}
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Apellido"
                    >
                        {getFieldDecorator('apellido', {
                            initialValue: apellido,
                            rules: [{ required: true, message: 'Añade un apellido' }],
                        })(
                            <Input 
                                onChange={ e => {
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            apellido: e.target.value
                                        }
                                    })
                                }}
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Empresa"
                    >
                        {getFieldDecorator('empresa', {
                            initialValue: empresa,
                            rules: [{ required: true, message: 'Añade una empresa' }],
                        })(
                            <Input 
                                onChange={ e => {
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            empresa: e.target.value
                                        }
                                    })
                                }}
                            />
                        )}
                    </Form.Item>
                
                    {
                        emails.map((input, index) => {

                            var mario = this.state.emails[index].email;

                            return (
                            <Form.Item
                                key={index}
                                label="email"
                            >
                                <Fragment>
                                    <Input defaultValue={input.email} onChange={this.leerCampo(index)} />
                                    <Button

                                        onClick={this.quitarCampo(index)}
                                    >
                                    <Icon type="delete" />
                                        Eliminar 
                                    </Button>
                                </Fragment>
                                
                            </Form.Item>
                        ) 
                                }
                        )
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
                            initialValue: tipo,
                            rules: [{ required: true, message: 'Añade un tipo de cliente!' }],
                        })(
                            <Select
                                placeholder="Selecciona una opción"
                                onChange={ e => {
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            tipo: e.target.value
                                        }
                                    })
                                }}
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
                )      
    }
}
 
const WrappedApp = Form.create({ name: 'coordinated' })(FormularioEditarCliente);
export default withRouter(WrappedApp);
