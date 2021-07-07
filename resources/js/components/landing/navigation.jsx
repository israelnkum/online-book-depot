import React from 'react';
import {Layout, Col, Input, Menu, Row, Space, Button, Typography} from "antd";
import PropTypes from 'prop-types'
const { Header } = Layout
import {
    MenuOutlined,
    ShoppingCartOutlined,
    SearchOutlined,
    UserOutlined,
    HomeOutlined,
    ShoppingOutlined
} from "@ant-design/icons";

export default function Navigation(props) {
    // const suffix = (
    //     <Button type={'default'} size={'small'} ghost icon={<SearchOutlined/>}/>
    // );

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} className={'nav-bar'}>
            <Row>
                <Col xs={16} sm={16} md={8} lg={8} xl={8} xxl={8}>
                    <div className="logo" align={'right'}>
                        <Typography.Text onClick={() =>  window.location.href="/"}   style={{ cursor: 'pointer' }}>
                            <span className={'logo-brand-1'}>os</span><span className={'logo-brand'}>Shop</span>
                        </Typography.Text>
                    </div>
                </Col>
                <Col xs={8} sm={8} md={16} lg={16} xl={16} xxl={16}>
                    <Menu className={'nav-bar-menu'} overflowedIndicator={
                        <Space>
                            <MenuOutlined />
                        </Space>
                    } theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key={'in'} >
                            <Input.Search style={{ verticalAlign: 'middle' }} placeholder={'Search'}/>
                        </Menu.Item>
                        <Menu.Item key={'Home'} icon={<HomeOutlined />}>Home</Menu.Item>
                        <Menu.Item key={'Shop'} icon={<ShoppingOutlined />}>Shop</Menu.Item>
                        <Menu.Item key={'Cart'} icon={<ShoppingCartOutlined/>}>
                            Cart
                        </Menu.Item>
                        {props.children}
                    </Menu>
                </Col>
            </Row>
        </Header>
    )
}

Navigation.propTypes = {
    children: PropTypes.node.isRequired
}
