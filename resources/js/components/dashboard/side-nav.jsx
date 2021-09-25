import React from 'react'
import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UserOutlined, GiftOutlined, ReadOutlined, LockOutlined, ShopOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

const SideNav = (props) => {
  return (
        <Layout.Sider breakpoint="lg" collapsedWidth="0">
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="my-account" icon={<UserOutlined />}>
                    <Link to={'/home'}>My Account</Link>
                </Menu.Item>
                <Menu.SubMenu key="admin-orders" icon={<UserOutlined />} title="Orders">
                    <Menu.Item key="my-orders">
                        <Link to={'/orders'}>My Orders</Link>
                    </Menu.Item>
                    {
                        props.role === 'Admin' &&
                            <Menu.Item key="orders" icon={<GiftOutlined />}>
                                <Link to={'/orders/all'}>All Orders</Link>
                            </Menu.Item>
                    }
                </Menu.SubMenu>
                {
                    props.role === 'Admin' &&
                    <>
                        <Menu.Item key="shops" icon={<ShopOutlined />}>
                            <Link to={'/shops'}>Shops</Link>
                        </Menu.Item>
                        <Menu.Item key="items" icon={<ReadOutlined />}>
                            <Link to={'/items'}>Items</Link>
                        </Menu.Item>
                        <Menu.Item key="tags-categories" icon={<ShopOutlined />}>
                            <Link to={'/tag-categories'}>Brands & Categories</Link>
                        </Menu.Item>
                        <Menu.Item key="pickup-stations" icon={<ShopOutlined />}>
                            <Link to={'/pickup-stations'}>Pickup Stations</Link>
                        </Menu.Item>
                        <Menu.SubMenu key="users" icon={<UserOutlined />} title="Users">
                            <Menu.Item key="customers" icon={<UserOutlined />}>
                                <Link to={'/orders'}>Customers</Link>
                            </Menu.Item>
                            <Menu.Item key="admins" icon={<UserOutlined />}>
                                <Link to={'/orders/all'}>Admins</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </>
                }
                <Menu.Item key="change-password" icon={<LockOutlined />}>
                    <Link to={'/change-password'}>Change Password</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
  )
}

SideNav.propTypes = {
  role: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    role: state.userReducer.authUser.role
  }
}
export default connect(mapStateToProps)(SideNav)
