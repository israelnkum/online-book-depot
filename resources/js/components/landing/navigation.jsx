import React from 'react'
import { Layout, Col, Menu, Row, Space, Typography, Badge, Avatar } from 'antd'
import PropTypes from 'prop-types'
import {
  MenuOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  ShoppingOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomSearch from '../commons/custom-search'
const { Header } = Layout

const Navigation = (props) => {
  const { totalCartItems } = props
  return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} className={'nav-bar'}>
            <Row>
                <Col xs={16} sm={16} md={8} lg={8} xl={8} xxl={8}>
                    <div className="logo" align={'right'}>
                        <Typography.Text onClick={() => { window.location.href = '/' }} style={{ cursor: 'pointer' }}>
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
                        <Menu.Item style={{ width: 300, textTransform: 'capitalize' }} key={'search'}>
                            <CustomSearch/>
                        </Menu.Item>
                        <Menu.Item onClick={() => { window.location.href = '/' }} key={'Home'} icon={<HomeOutlined />}>Home</Menu.Item>
                        <Menu.Item key={'Shop'} icon={<ShoppingOutlined />}>
                            <Link style={{ color: '#f56a00' }} to={'/landing/shop'}>Shop</Link>
                        </Menu.Item>
                        <Menu.Item key={'Cart'}>
                            <Link to={'/landing/cart'}>
                                <Badge showZero count={totalCartItems}>
                                    <Avatar style={{ backgroundColor: '#f56a00' }} icon={<ShoppingCartOutlined/>} shape="square"/>
                                </Badge>
                            </Link>
                        </Menu.Item>
                        {props.children}
                    </Menu>
                </Col>
            </Row>
        </Header>
  )
}

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
  totalCartItems: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    totalCartItems: state.cartReducer.cartItems.reduce(function (acc, val) { return acc + val.qty }, 0)
  }
}
export default connect(mapStateToProps)(Navigation)
