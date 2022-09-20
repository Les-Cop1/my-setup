import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Layout as AntLayout, Menu } from 'antd'
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from '@helpers'
const { Header } = AntLayout
const { SubMenu } = Menu

export const Layout: React.FC = () => {
  const { user, signout } = useAuth()

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          {user ? (
            <>
              <Menu.Item key="setup">
                <Link to="/setup">My Setup</Link>
              </Menu.Item>
              <SubMenu key="account-menu" icon={<UserOutlined />} title={user.username}>
                <Menu.Item key="account" icon={<UserOutlined />}>
                  <Link to="account">Account</Link>
                </Menu.Item>
                <Menu.Item key="logout" onClick={signout} icon={<LogoutOutlined />}>
                  Logout
                </Menu.Item>
              </SubMenu>
            </>
          ) : (
            <Menu.Item key="register" icon={<LoginOutlined />}>
              <Link to="/register">Login or Register</Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <AntLayout>
        <Outlet />
      </AntLayout>
    </AntLayout>
  )
}
