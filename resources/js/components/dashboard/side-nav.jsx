import React from 'react';
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {UserOutlined, GiftOutlined, ReadOutlined, LockOutlined, ShopOutlined} from '@ant-design/icons';

const { Sider } = Layout;

export default function SideNav() {
    return (
        <Sider breakpoint="lg" collapsedWidth="0">
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="my-account" icon={<UserOutlined />}>
                    <Link to={'/home'}>My Account</Link>
                </Menu.Item>
                <Menu.Item key="orders" icon={<GiftOutlined />}>
                    Orders
                </Menu.Item>
                <Menu.Item key="items" icon={<ReadOutlined />}>
                    <Link to={'/items'}>Items</Link>
                </Menu.Item>
                <Menu.Item key="shops" icon={<ShopOutlined />}>
                    <Link to={'/shops'}>Shops</Link>
                </Menu.Item>
                <Menu.Item key="tags-categories" icon={<ShopOutlined />}>
                    <Link to={'/tag-categories'}>Brands & Categories</Link>
                </Menu.Item>
                <Menu.Item key="change-password" icon={<LockOutlined />}>
                    Change Password
                </Menu.Item>
            </Menu>
        </Sider>

    );
}

