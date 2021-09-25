import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CategoryBanner from '../../category-items/category-banner'
import { Breadcrumb, Button, Col, Row, Space, Typography } from 'antd'
import CategoryBreadcrumb from '../../category-items/category-breadcrumb'
import CartItem from './cart-item'
import { Link, useHistory } from 'react-router-dom'
const Cart = (props) => {
  const history = useHistory()
  const { cartItems, userDetail } = props
  const total = cartItems.length

  const handleCheckout = () => {
    const loggedIn = Object.keys(userDetail).length === 0
    loggedIn && window.location.replace('/login')
    history.push('/checkout')
    console.log(loggedIn)
  }
  return (
        <div style={{ marginBottom: 50 }}>
            <CategoryBanner heroText={'Cart'} >
                <CategoryBreadcrumb>
                    <Breadcrumb.Item>
                        Cart
                    </Breadcrumb.Item>
                </CategoryBreadcrumb>
            </CategoryBanner>
            <Row style={{ marginTop: 25 }} justify={'center'} align={'top'} gutter={[15, 15]}>
                <Col span={16} xs={24} sm={24} md={16} xl={16} xxl={16}>
                    <Typography.Title level={3}>{total} Item(s) in Cart</Typography.Title>
                    <CartItem data={cartItems}/>
                </Col>
                <Col span={16} xs={24} sm={24} md={16} xl={16} xxl={16}>
                    <div align={'center'} style={{ marginBottom: 50 }}>
                        <Typography.Title level={4}>Total: <span className={'text-primary'}>
                           GH₵{cartItems.reduce(function (acc, val) { return acc + (val.unitPrice * val.qty) }, 0)}</span>
                        </Typography.Title>
                        <Space>
                            <Button onClick={() => { handleCheckout() }} className={'text-primary'} disabled={total <= 0}>CHECKOUT</Button>
                            <Button onClick={() => { window.location.href = '/' }} type={'primary'}>CONTINUE SHOPPING</Button>
                        </Space>
                    </div>
                </Col>
            </Row>
        </div>
  )
}

Cart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  userDetail: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducer.cartItems,
    userDetail: state.userReducer.userDetail
  }
}

export default connect(mapStateToProps)(Cart)
