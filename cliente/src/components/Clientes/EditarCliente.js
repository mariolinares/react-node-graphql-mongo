import React, { Component, Fragment } from 'react';
import { CLIENTE_QUERY } from '../../queries';
import { Query } from 'react-apollo';

import FormularioEditarCliente from './FormularioEditarCliente';


export default class EditarCliente extends Component {
    
    render() {
        // Recibir el id del contacto a editar

        const { id } = this.props.match.params;


        return (
            <Fragment>
                <div className="block">
                    <h1>Editar Cliente</h1>

                    <Query query={CLIENTE_QUERY} variables={{id}} >
                        {({ loading, error, data, refetch }) => {
                            if(loading) return 'Cargando...';
                            if(error) return error.message;

                            console.log(data);
                            return (
                                <FormularioEditarCliente
                                    cliente={data.getCliente}
                                    refetch={refetch}
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
        )
    }
}
