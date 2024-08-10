import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Row, Card, Typography, Button, List, Tag, Spin } from 'antd'
import CheckoutItems from './checkout-items'
import { handleCreateOrder, handleMakePayment } from '../../actions/payment/PaymentActions'
import { getAllAddress } from '../../actions/user/UserAction'
import { AddressItem } from '../customer/account-overview/address-book/address-item'
import { AddressForm } from '../customer/account-overview/address-book/address-form'
import { EditOutlined } from '@ant-design/icons'
import PopUp from './popup'
import SelectPickupLocation from './select-pickup-location'
const Checkout = (props) => {
  const {
    cartItems, userDetail, createOrder, makePayment,
    defaultAddress, getAllAddress, addressBook
  } = props

  const [selectedPickupLocation, setSelectedPickupLocation] = useState({})
  const [fetching, setFetching] = useState(true)
  const [showPopUp, setShowPopUp] = useState(false)
  const [creatingOrder, setCreatingOrder] = useState(false)

  const [selectedAddress, setSelectedAddress] = useState(defaultAddress)

  const total = cartItems.length
  const totalAmount = cartItems.reduce(function (acc, val) { return acc + (val.unitPrice * val.qty) }, 0)
  const handlePay = () => {
    setCreatingOrder(true)
    createOrder({
      cartItems: cartItems,
      deliveryAddressId: selectedAddress.id,
      pickupLocationId: selectedPickupLocation.id
    }).then((res) => {
      setCreatingOrder(false)
      // flutterMakePayment({
      //   user: userDetail,
      //   deliveryFee: selectedPickupLocation.shippingFee,
      //   itemTotal: totalAmount,
      //   amount: selectedPickupLocation.shippingFee + totalAmount
      // }, res.data)
      makePayment({
        user: userDetail,
        deliveryFee: selectedPickupLocation.shippingFee,
        itemTotal: totalAmount,
        amount: selectedPickupLocation.shippingFee + totalAmount
      }, res.data)
    })
  }

  const handleSelectedAddress = (addr) => {
    setSelectedAddress(addr)
    setShowPopUp(false)
  }

  const fetchDeliveryAddresses = () => {
    getAllAddress().then(() => {
      setShowPopUp(true)
      setFetching(false)
    })
  }

  const handleSelectPickupLocation = e => {
    setSelectedPickupLocation(e.target.value)
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.flutterwave.com/v3.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
        <div style={{ marginBottom: 50 }}>
            <PopUp title={'Delivery Address'} showModal={showPopUp} setShowModal={() => { setShowPopUp(!showPopUp) }}>
                <Spin spinning={fetching}>
                    {
                        addressBook && addressBook.length > 0
                          ? <List
                                itemLayout="horizontal"
                                dataSource={addressBook}
                                renderItem={item => (
                                    <AddressItem addressObj={item}
                                                 action={
                                                     item.id === selectedAddress.id
                                                       ? <Tag color={'blue'}>SELECTED</Tag>
                                                       : <Button onClick={() => {
                                                         handleSelectedAddress(item)
                                                       }} size={'small'}>Choose</Button>
                                                 }
                                    />
                                )}
                            />
                          : <>Go To your account and add address book</>
                    }
                </Spin>
            </PopUp>
            <Row style={{ marginTop: 25 }} justify={'center'} align={'top'} gutter={[15, 15]}>
                <Col span={16} xs={24} sm={24} md={16} xl={16} xxl={16}>
                    <Card style={{ marginBottom: 10 }} size={'small'} title={'Delivery Address'} extra={[
                        <Button onClick={() => { fetchDeliveryAddresses() }} size={'small'} key={'change'} type={'primary'}>CHANGE</Button>
                    ]}>
                        <AddressItem addressObj={selectedAddress} action={
                            <AddressForm
                                btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}
                                formValues={selectedAddress}/>
                        }/>
                    </Card>
                    <SelectPickupLocation
                        addressId={selectedAddress?.id}
                        selectedPickupLocation={selectedPickupLocation}
                        handleSelectPickupLocation={handleSelectPickupLocation}
                    />
                    <Card title={'Payment Method'}>
                        <div align={'center'}>
                            <p>Sub Total: <span className={'text-primary'}>GH₵{totalAmount}</span></p>
                            <p>
                                Delivery Fee: <span className={'text-primary'}>GH₵ {selectedPickupLocation.shippingFee}</span>
                            </p>
                        </div>
                        <div style={{ display: Object.keys(selectedPickupLocation).length === 0 ? 'none' : 'block' }} align={'center'}>
                            <Button loading={creatingOrder} onClick={() => handlePay()} type={'primary'}>Make Payment</Button>
                        </div>
                    </Card>
                </Col>
                <Col span={8} xs={24} sm={24} md={8} xl={8} xxl={8}>
                    <Typography.Text level={3}>{total} Item(s) in Order</Typography.Text>
                    <CheckoutItems data={cartItems}/>
                </Col>
            </Row>
        </div>
  )
}

Checkout.propTypes = {
  cartItems: PropTypes.array.isRequired,
  addressBook: PropTypes.array,
  userDetail: PropTypes.object,
  defaultAddress: PropTypes.object,
  getAllAddress: PropTypes.func,
  makePayment: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    defaultAddress: state.userReducer.addressBook.filter((address) => address.default === 1)[0],
    cartItems: state.cartReducer.cartItems,
    userDetail: state.userReducer.userDetail,
    addressBook: state.userReducer.addressBook
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAddress: () => dispatch(getAllAddress()),
    createOrder: (data) => dispatch(handleCreateOrder(data)),
    makePayment: (data, order) => dispatch(handleMakePayment(data, order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
