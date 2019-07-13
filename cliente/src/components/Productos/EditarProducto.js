import React, { Component } from 'react';
import {Query} from 'react-apollo';

import FormularioEditarProducto from './FormularioEditarProducto'

import {OBTENER_PRODUCTO} from '../../queries';

class EditarProducto extends Component {
  render() {

    //obtenemos el id
    const { id } = this.props.match.params;

    console.log(id)
    
    return (
      <div className="block">
        <h1>Editar producto</h1>

        <div className="formulario">
            <Query query={OBTENER_PRODUCTO} variables={{id}}>
                {({  loading, error, data, refetch }) => {
                    if(loading) return 'Cargando...';
                    if(error) return `Error: ${error.message}`;
                    
                    console.log(data);
                    
                    return (
                        <FormularioEditarProducto 
                            producto={data}
                            id={id}
                            refetch={refetch}
                        />
                    )

                }}

            </Query>
        </div>

      </div>
    )
  }
}

export default EditarProducto;
