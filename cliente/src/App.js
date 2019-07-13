import React, { Component, Fragment } from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  Layout, Menu, Breadcrumb, Icon, Affix
} from 'antd';

import Headers from './components/Layout/Header';
import Clientes from './components/Clientes/Clientes';
import EditarCliente from './components/Clientes/EditarCliente';
import NuevoCliente from './components/Clientes/NuevoCliente';
import Productos from './components/Productos/Productos';
import NuevoProducto from './components/Productos/NuevoProducto';
import NuevaFactura from './components/Facturas/NuevaFactura';
import Formulario from './components/Formulario';
import EditarProducto from './components/Productos/EditarProducto';
import NuevoPedido from './components/Pedidos/NuevoPedido'


const { SubMenu } = Menu;
const { Content, Sider } = Layout;


const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
})

class App extends Component {
  constructor(){
    super();
    this.state = {
      top: 0
    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Layout>
          <Affix offsetTop={this.state.top}>
            <Headers/>
          </Affix>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                  <Menu
                    mode="inline"
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                  >
                    <SubMenu key="sub1" title={<span><Icon type="usergroup-add" />Clientes</span>}>
                      <Menu.Item key="1">
                        <Link to="/cliente/nuevo"> 
                          <Icon type="user-add" />
                          Añadir Cliente
                        </Link>
                      </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                      <Menu.Item key="5">option5</Menu.Item>
                      <Menu.Item key="6">option6</Menu.Item>
                      <Menu.Item key="7">option7</Menu.Item>
                      <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                      <Menu.Item key="9">option9</Menu.Item>
                      <Menu.Item key="10">option10</Menu.Item>
                      <Menu.Item key="11">option11</Menu.Item>
                      <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                  <Content style={{
                    
                  }}
                  >
                    <Switch>
                      <Route exact path="/" component={Clientes}/>
                      <Route exact path="/cliente/nuevo" component={NuevoCliente}/>
                      <Route exact path="/cliente/editar/:id" component={EditarCliente}/>
                      <Route exact path="/producto/nuevo" component={NuevoProducto}/>
                      <Route exact path="/productos" component={Productos}/>
                      <Route exact path="/productos/editar/:id" component={EditarProducto}/>
                      <Route exact path="/factura/nueva" component={NuevaFactura}/>
                      <Route exact path="/formulario" component={Formulario}/>
                      <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido}/>
                      </Switch>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
