import gql from 'graphql-tag';


export const CLIENTES_QUERY = gql`
    query getClientes($limite: Int, $offset: Int) {
        getClientes(limite: $limite, offset: $offset){
            id
            nombre
            apellido
            empresa
            emails {
                email
            }
            tipo
            pedidos {
                producto
                precio
            }
        }
    totalClientes
    }
`;

export const CLIENTE_QUERY = gql`
    query ConsultarClientes($id: ID){
        getCliente(id: $id){
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

export const OBTENER_PRODUCTOS = gql`
    query {
        obtenerProductos{
            id
            nombre
            descripcion
            precio
            stock
        } 
    }

`;

export const OBTENER_PRODUCTO = gql`
query obtenerProducto($id: ID!){
    obtenerProducto(id: $id){
        nombre
        descripcion
        precio
        stock
    }
}
`;
