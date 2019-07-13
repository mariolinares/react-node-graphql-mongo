import React, { Component, Fragment } from 'react';
import {Query} from 'react-apollo';
import {CLIENTE_QUERY} from '../../queries';
import {List, Spin, Divider} from 'antd';

const DatosCliente = ({id}) => {

    return (
        <Fragment>
            <Query query={CLIENTE_QUERY} variables={{id}} pollInterval={500}>
                {({ loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return <Spin />;
                    if (error) return `Error: ${error.message}`;
                    
                    //console.log(data.getCliente);

                    const {nombre, apellido, emails, empresa, tipo} = data.getCliente;

                    return (
                        <div className="datosCliente">
                            <div className="header">
                                <h3>Datos del cliente</h3>
                            </div>
                            <div className="content">
                                <h4>{nombre} {apellido}</h4>
                                <span>{empresa}</span>
                                {emails.map(email => (<span key={email.email}>{`${email.email}`}</span>))}
                            </div>
                            <Divider><span>Usuario</span>{tipo}</Divider>
                            
                        </div>
                    )   

                }}
            </Query>
        </Fragment>
    )
}

export default DatosCliente;