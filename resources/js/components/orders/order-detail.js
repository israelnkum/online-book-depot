import React, { useState } from 'react'
import { Drawer, Button, Row, Col, Card, List, Avatar, Typography } from 'antd'
import { connect } from 'react-redux'
import { handleGetOrderDetail } from '../../actions/orders/OrderActions'
import PropTypes from 'prop-types'

const OrderDetail = (props) => {
  const { orderDetail, orderId } = props
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  return (
        <>
            <Button size={'small'} type="primary" onClick={showDrawer}>
                Details
            </Button>
            <Drawer width={'100%'} title={`Order # ${orderDetail.orderNumber}`} placement="right" onClose={onClose} visible={visible}>
                <Row gutter={[15, 15]}>
                    <Col span={12} xs={24} sm={24} lg={12} xl={12} xxl={12}>
                        <Row gutter={[15, 15]}>
                            <Col span={24} xs={24} sm={24} lg={24} xl={24} xxl={24}>
                                <Card size={'small'} title={'Customer'}>
                                    <p>{orderDetail.customer.name}</p>
                                    <p>{orderDetail.customer.phoneNumber}</p>
                                    <p>{orderDetail.customer.email}</p>
                                </Card>
                            </Col>
                            <Col span={24} xs={24} sm={24} lg={24} xl={24} xxl={24}>
                                <Card size={'small'} title={'Payment information'}>
                                    {
                                        orderDetail.payments === null
                                          ? '-'
                                          : <>
                                            <p>
                                                <Typography.Text strong>Delivery Fee: </Typography.Text>
                                                GHC {orderDetail.payments.deliveryFee}
                                            </p>
                                            <p>
                                                <Typography.Text strong>Items Total: </Typography.Text>
                                                GHC {orderDetail.payments.itemTotal}
                                            </p>
                                            <p>
                                                <Typography.Text strong>Total: </Typography.Text>
                                                GHC {orderDetail.payments.itemTotal + orderDetail.payments.deliveryFee}
                                            </p>
                                            </>
                                    }
                                </Card>
                            </Col>
                            <Col span={24} xs={24} sm={24} lg={24} xl={24} xxl={24}>
                                <Card size={'small'} title={'Delivery information'}>
                                    <Typography.Text strong>Delivery Method</Typography.Text>
                                    <p>{orderDetail.pickupStation === null ? 'Home or Office Delivery' : 'Pickup Station'}</p>
                                    {
                                        orderDetail.pickupStation !== null &&
                                        <>
                                            <Typography.Text strong>Pickup Station Address</Typography.Text>
                                            <p>{orderDetail.pickupStation.name}</p>
                                            <p>{orderDetail.pickupStation.nearestLandMark}</p>
                                            <p>{orderDetail.pickupStation.address}</p>
                                            <p>{orderDetail.pickupStation.contactPerson}</p>
                                            <p>{orderDetail.pickupStation.phoneNumber + ' - ' + orderDetail.pickupStation.phoneNumberAlt}</p>
                                        </>
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12} xl={12} xxl={12}>
                        <Card size={'small'} title={'Items in Order'}>
                            {
                                orderDetail.items && orderDetail.items.map((item) => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            avatar={ <Avatar size={50} src={'/storage/images/items/' + item.item.file}/>}
                                            title={item.item.name}
                                            description={
                                                <>
                                                    <Typography.Text disabled={item.discountedPrice > 0} delete={item.discountedPrice > 0}>GHC {item.sellingPrice}</Typography.Text>
                                                    &nbsp;{ item.discountedPrice > 0 && <Typography.Text>{`GHC ${item.discountedPrice}`}</Typography.Text> } <br/>
                                                    <Typography.Text>Qty: {item.qty}</Typography.Text>
                                                </>
                                            }
                                        />
                                    </List.Item>
                                ))
                            }
                        </Card>
                    </Col>
                </Row>
            </Drawer>
        </>
  )
}

OrderDetail.propTypes = {
  orderDetail: PropTypes.object,
  orderId: PropTypes.string.isRequired
  // getOrderDetail: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    // orderDetail: state.ordersReducer.orderDetail
  }
}

const mapDispatchToProps = (dispatch) => ({
  // getOrderDetail: (id) => dispatch(handleGetOrderDetail(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
