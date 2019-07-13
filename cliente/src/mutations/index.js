import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
    mutation crearCliente($input: ClienteInput) {
        crearCliente(input: $input){
            id
            nombre
            apellido
        }
    }
`;

export const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente($input: ClienteInput){
        actualizarCliente(input: $input){
            id
            nombre
            apellido
            empresa
            emails {
                email
            }
            tipo
        }
    }
`;

export const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id: ID!){
        eliminarCliente(id: $id)
    }
`;


export const NUEVO_PRODUCTO = gql`
    mutation nuevoProducto($input: ProductoInput) {
        nuevoProducto(input: $input){
            id
            nombre
            descripcion
            precio
            stock
        }
    }
`;

export const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!){
        eliminarProducto(id: $id)
    }
`;

export const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($input: ProductoInput){
        actualizarProducto(input: $input){
            nombre
            precio
            stock
            descripcion
            
        }
    }
`;

export const NUEVA_FACTURA = gql`
    mutation nuevaFactura($input: FacturaInput) {
        nuevaFactura(input: $input){
            id
            numero
            fecha
            referencia
            cliente
            misDatos
            lineas {
                cantidad
                concepto
                iva
                precio
            }
            baseImponible
            recargoEquivalencia
            retencion
            formaDePago
            
        }
    }
`;