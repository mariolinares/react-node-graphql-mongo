import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import logo from '../samsung-logo.jpg'
const { Header } = Layout;




export default class Headers extends Component {
  render() {
    return (
      <Header>
        <div className="dflex">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/"> 
                Clientes
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/productos"> 
                Productos
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/producto/nuevo"> 
                Nuevo Productos
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
            <Link to="/factura/nueva"> 
            Facturas
            </Link>
            </Menu.Item>
            <Menu.Item key="5">
            <Link to="/formulario"> 
            Formulario
            </Link>
            </Menu.Item>
          </Menu>
        </div>
    </Header>
    )
  }
}
