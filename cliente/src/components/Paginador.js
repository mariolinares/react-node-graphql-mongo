import React, { Component } from 'react';
import {Button, Icon} from 'antd';

export default class Paginador extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            paginador: {
                paginas: Math.ceil( Number(this.props.totalClientes) / this.props.limite )
            }
        }
    }
  render() {

    console.log(this.props);

    const {actual} = this.props;
    const btnAnterior = (actual > 1) ? <Button onClick={this.props.paginaAnterior}><Icon type="swap-left" style={{ fontSize: '11px' }} /> Anterior</Button> : "";

    // btn siguiente
    const { paginas } = this.state.paginador;
    const btnSiguiente = (actual !== paginas) ? <Button onClick={this.props.paginaSiguiente}>Siguiente <Icon style={{ fontSize: '11px' }} type="swap-right"  /></Button> : ""

    return (
      <div className="paginador d-flex">
        {btnAnterior}
        {btnSiguiente}
      </div>
    )
  }
}
