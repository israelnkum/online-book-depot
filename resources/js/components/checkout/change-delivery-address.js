import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Row, Card, Typography, Radio, Button } from 'antd'
import CheckoutItems from './checkout-items'
import { handleMakePayment } from '../../actions/payment/PaymentActions'
import flutterMakePayment from '../../utils'
import { getAllAddress } from '../../actions/user/UserAction'
import { AddressItem } from '../customer/account-overview/address-book/address-item'
import { handleGetCustomerPickupLocation } from '../../actions/pickup-stations/Action'
import { AddressForm } from '../customer/account-overview/address-book/address-form'
import { EditOutlined } from '@ant-design/icons'
import PopUp from './popup'
const ChangeDeliveryAddress = (props) => {
  const [deliveryType, setDeliveryType] = useState('pickup')
  const [showPopUp, setShowPopUp] = useState(false)
  const {
    cartItems,
    defaultAddress, myPickupLocation, getAllAddress, addressBook
  } = props
  const options = [
    { label: 'Pickup', value: 'pickup' },
    { label: 'Home or Office Delivery', value: 'home-office-delivery' }
  ]
  const total = cartItems.length
  const handlePay = () => {
    flutterMakePayment()
  }
  const onChange4 = e => {
    setDeliveryType(e.target.value)
  }
  useEffect(() => {

  }, [showPopUp])
  const fetchLocations = (id) => {
    myPickupLocation(id).then(() => {
      setShowPopUp(true)
    })
  }
  const fetchDeliveryAddresses = () => {
    getAllAddress().then(() => {
      setShowPopUp(true)
    })
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.flutterwave.com/v3.js'
    script.async = true
    document.body.appendChild(script)
    console.log(defaultAddress)
  }, [])

  return (
        <div style={{ marginBottom: 50 }}>
            <PopUp showModal={showPopUp} setShowModal={() => { setShowPopUp(!showPopUp) }}>
                {
                    showPopUp === true && JSON.stringify(addressBook)
                }
            </PopUp>
            <Row style={{ marginTop: 25 }} justify={'center'} align={'top'} gutter={[15, 15]}>
                <Col span={16} xs={24} sm={24} md={16} xl={16} xxl={16}>
                    <Card size={'small'} title={'Delivery Address'} extra={[
                        <Button onClick={() => { fetchDeliveryAddresses() }} size={'small'} key={'change'} type={'primary'}>CHANGE</Button>
                    ]}>
                        <AddressItem addressObj={defaultAddress}
                                     action={
                                         <AddressForm
                                             btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}
                                             formValues={defaultAddress}/>
                                     }/>
                    </Card>
                    <Card size={'small'} title={'Delivery Method'}>
                        <Radio.Group
                            options={options}
                            onChange={(e) => { onChange4(e) }}
                            value={deliveryType}
                            optionType="button"
                            buttonStyle="solid"
                        />
                        <div style={{ padding: '20px 0 ' }}>
                            {deliveryType === 'pickup' && <Button onClick={() => { fetchLocations(defaultAddress.id) }}>Select Pickup Location</Button>}
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

ChangeDeliveryAddress.propTypes = {
  cartItems: PropTypes.array.isRequired,
  addressBook: PropTypes.array,
  makePayment: PropTypes.func.isRequired,
  userDetail: PropTypes.object,
  defaultAddress: PropTypes.object,
  myPickupLocation: PropTypes.func,
  getAllAddress: PropTypes.func
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
    makePayment: () => dispatch(handleMakePayment()),
    myPickupLocation: (locationId) => dispatch(handleGetCustomerPickupLocation(locationId)),
    getAllAddress: () => dispatch(getAllAddress())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDeliveryAddress)
