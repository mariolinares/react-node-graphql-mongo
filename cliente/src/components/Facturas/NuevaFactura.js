import React, { Component, Fragment } from 'react';
import {Row, Col, Input, Button, Icon} from 'antd';

import {  NUEVA_FACTURA } from '../../mutations';
import { Mutation } from 'react-apollo';

const { TextArea } = Input;

export default class NuevaFactura extends Component {
    constructor(props){
        super(props);
        this.state = {
            numero: '',
            fecha: '',
            referencia: '',
            cliente: '',
            misDatos: '',
            baseImponible: '',
            recargoEquivalencia: '',
            retencion: '',
            formaDePago: '',
            linea: {
                cantidad: null,
                concepto: '',
                precio: null,
                iva: null
            },
            lineas: [],
            totalLineas: {}
        }
        console.log(this.state);
    }

    actualizarState = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name] : value
        })

    }

    validarForm = () => {
        const {numero, fecha, referencia, cliente, misDatos, cantidad, concepto, precio, baseImponible, iva, recargoEquivalencia, retencion, formaDePago} = this.state;

        const noValido = !numero || !fecha || !referencia || !cliente || !misDatos || !cantidad || !concepto || !precio || !baseImponible || !iva || !recargoEquivalencia || !retencion || !formaDePago;

        console.log(noValido);
        return noValido;
    }

    crearNuevaFactura = (e, nuevaFactura) => {
        e.preventDefault();

        // insertamos en la base de datos 
        nuevaFactura().then(data => {
            console.log(data);
        })

    }


    nuevoCampo = () => {
        this.setState({
            lineas: this.state.lineas.concat([
                { cantidad: '', concepto: '', precio: '', iva: '' }
            ])
        })
    }

    quitarCampo = (i) => () => {
        console.log(i);
        this.setState({
            lineas: this.state.lineas.filter((linea, index) => i !== index)
        })
    }

    leerCampo = (i) => (e) => {
        console.log(i);
        console.log(e.target.value);

        const nuevaLinea = this.state.lineas.map((linea, index) => {
            if(i !== index) return linea;
            const {name, value} = e.target;
            console.log(name, value);

            if (name === 'concepto') {
                return {
                    ...linea,
                    [name] : value
                }
            } else {
                return {
                    ...linea,
                    [name] : Number(value)
                }

            }
        });
        this.setState({
            lineas: nuevaLinea
        })
        
    }

    totalLinea = () => {
        return <div>{this.state.lineas.cantidad * this.state.lineas.precio}</div>
    }


    render() {
        const {numero, fecha, referencia, cliente, misDatos, baseImponible, recargoEquivalencia, retencion, formaDePago} = this.state;

        const {lineas} = this.state;

        console.log('cantidad es: ', this.state.lineas.cantidad);

        const input = {
            numero: Number(numero),
            fecha,
            referencia: Number(referencia),
            cliente,
            misDatos,
            lineas,
            baseImponible: Number(baseImponible),
            recargoEquivalencia: Number(recargoEquivalencia),
            retencion: Number(retencion),
            formaDePago,
        }  

        return (
        <div>
            <h1>Nueva Factura</h1>
            <Mutation 
                mutation={NUEVA_FACTURA}
                variables={{input}}
            >
            {(nuevaFactura, { loading, error, data }) => {
                return(
                    <form onSubmit={ e => this.crearNuevaFactura(e, nuevaFactura)}>
                <Row gutter={16}>
                    <Col span={6} style={{padding: 10}}>
                        <label htmlFor="numeroFactura">Número de factura</label>
                        <Input id="numeroFactura" name="numero" onChange={this.actualizarState} placeholder="Aquí el número de factura" />
                    </Col>
                    <Col span={6} style={{padding: 10}}>
                        <label htmlFor="fechaFactura">Fecha</label>
                        <TextArea id="fechaFactura" name="fecha" onChange={this.actualizarState} placeholder="Aquí la fecha de la facturaclientec" autosize />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6} style={{padding: 10}}>
                        <label htmlFor="referenciaFacutura">Referencia</label>
                        <Input id="referenciaFacutura" name="referencia" onChange={this.actualizarState} type="number" placeholder="Referencia"/>
                    </Col>
                    <Col span={6} style={{padding: 10}}>
                        <label htmlFor="cliente">Cliente</label>
                        <Input id="cliente" name="cliente" onChange={this.actualizarState}  placeholder="Cliente" />
                    </Col>
                    <Col span={6} style={{padding: 10}}>
                        <label htmlFor="misDatos">Mis datos</label>
                        <Input id="misDatos" name="misDatos" onChange={this.actualizarState}  placeholder="Mis datos" />
                    </Col>
                </Row>
                <Row gutter={16}> 
                
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
                                Añadir Linea
                            </Button>
                        </div>
                    </div>

                    {
                        this.state.lineas.map((linea, index) => {

                            const totalLinea = linea.cantidad * linea.precio;
                            console.log(`El total de la linea es: ${totalLinea}`);

                            console.log(typeof totalLinea);

                            if(totalLinea === 'undefined' || totalLinea === null){
                                console.log('esundefined');
                            }

                            return (
                            
                                    <Fragment>

                                    

                                    <Col span={6} style={{padding: 10}}>
                                        <label htmlFor="concepto">Concepto</label>
                                        <Input id="concepto" name="concepto" onChange={this.leerCampo(index)}  placeholder="Concepto" />
                                    </Col>
                                    <Col span={6} style={{padding: 10}}>
                                        <label htmlFor="cantidad">Cantidad</label>
                                        <Input id="cantidad" name="cantidad" onChange={this.leerCampo(index)}  placeholder="Cantidad" />
                                    </Col>
                                    <Col span={6} style={{padding: 10}}>
                                        <label htmlFor="precio">Precio</label>
                                        <Input id="precio" name="precio" type="number" onChange={this.leerCampo(index)}  placeholder="Precio" />
                                    </Col>
                                    <Col span={2} style={{padding: 10}}>
                                        <label htmlFor="iva">Iva</label>
                                        <Input id="iva" name="iva" type="number" onChange={this.leerCampo(index)}  placeholder="Iva" />
                                    </Col>

                                    <Col span={2} style={{padding: 10}}>
                                        <label htmlFor="iva">Total</label>
                                        <h4> { ((linea.cantidad * linea.precio) * (linea.iva / 100)) + linea.cantidad * linea.precio } </h4>
                                    </Col>

                                    <Col span={2} style={{padding: 0}}>   
                                        <Button
                                            onClick={this.quitarCampo(index)}
                                        >
                                       
                                            Eliminar 
                                        </Button>
                                    </Col>

                                    </Fragment>
                                    )}
                            
                        )
                    }

                </Row>
                <Row gutter={16}> 
                    <Col span={6} style={{padding: 10}}>
                        <label htmlFor="baseImponible">Base Imponible</label>
                        <Input id="baseImponible" name="baseImponible" onChange={this.actualizarState}  placeholder="Base Imponible" />
                    </Col>
                    <Col span={6} style={{padding: 10}}>
                        <label htmlFor="recargoEquivalencia">Recargo Equivalencia</label>
                        <Input id="recargoEquivalencia" name="recargoEquivalencia" onChange={this.actualizarState}  placeholder="Recargo Equivalencia" />
                    </Col>
                    <Col span={6} style={{padding: 10}}>
                        <label htmlFor="retencion">Retención</label>å
                        <Input id="retencion" name="retencion" onChange={this.actualizarState}  placeholder="Retención" />
                    </Col>
                    <Col span={6} style={{padding: 10}}>
                        <label htmlFor="formaDePago">Forma de Pago</label>
                        <Input id="formaDePago" name="formaDePago" onChange={this.actualizarState}  placeholder="Forma de pago" />
                    </Col> 
                </Row>
                <Button disabled={this.validarForm()} htmlType="submit" className="ant-btn ant-btn-primary">Crear Factura</Button>
            </form>
                    )
                }}
            </Mutation>
            </div>
        )
    }
}
