import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Radio, Button, Spin, Row, Col, List, Space } from 'antd'
import { connect } from 'react-redux'
import { handleGetCustomerPickupLocation } from '../../actions/pickup-stations/Action'
import PopUp from './popup'
const SelectPickupLocation = (props) => {
  const { myPickupLocation, addressId, pickupStations, selectedPickupLocation, handleSelectPickupLocation } = props
  const [showPopUp, setShowPopUp] = useState(false)
  const [deliveryType, setDeliveryType] = useState('pickup')
  const [fetching, setFetching] = useState(true)

  const options = [
    { label: 'Pickup', value: 'pickup' },
    { label: 'Home or Office Delivery', value: 'home-office-delivery' }
  ]
  const onChange4 = e => {
    setDeliveryType(e.target.value)
  }
  const fetchLocations = (id) => {
    myPickupLocation(id).then(() => {
      setShowPopUp(true)
      setFetching(false)
    })
  }

  const notLocation = Object.keys(selectedPickupLocation).length === 0
  return (
        <>
            <PopUp title={'Select Pickup Location'} showModal={showPopUp} setShowModal={() => { setShowPopUp(!showPopUp) }}>
                <Spin spinning={fetching}>
                    <Radio.Group value={selectedPickupLocation} onChange={handleSelectPickupLocation}>
                        <Space direction="vertical">
                            {
                                pickupStations && pickupStations.map((item) => (
                                    <Radio value={item} key={item.id}>
                                        <Row>
                                            <Col span={24}>
                                                {item.name}
                                            </Col>
                                            <Col span={8}>
                                                {item.address} <br/>
                                                {item.nearestLandMark} <br/>
                                                {item.contactPerson + ',' + item.region} <br/>
                                                {item.phoneNumber + '' + (item.phoneNumberAlt !== null ? '/' + item.phoneNumberAlt : '')}
                                            </Col>
                                            <Col span={16}>{item.additionalInfo}</Col>
                                        </Row>
                                    </Radio>
                                ))
                            }
                        </Space>
                    </Radio.Group>
                </Spin>
                <div align={'center'} style={{ padding: 30 }}>
                    <Button disabled={notLocation} type={'primary'} onClick={() => { setShowPopUp(!showPopUp) }}>Done</Button>
                </div>
            </PopUp>
            <Card size={'small'} title={'Delivery Method'}
            extra={[
                <Radio.Group
                    key={'type'}
                    options={options}
                    onChange={(e) => { onChange4(e) }}
                    value={deliveryType}
                    optionType="button"
                    buttonStyle="solid"
                />
            ]} style={{ marginBottom: 10 }}
                >
                {
                    !notLocation &&
                        <List.Item>
                            <List.Item.Meta
                                title={selectedPickupLocation.name}
                                description={
                                    <Row>
                                        <Col span={8}>
                                            {selectedPickupLocation.address} <br/>
                                            {selectedPickupLocation.contactPerson + ',' + selectedPickupLocation.phoneNumber} <br/>
                                       </Col>
                                    </Row>
                                }
                            />
                        </List.Item>
                }
                <div style={{ padding: '20px 0 ' }}>
                    {deliveryType === 'pickup' && <Button onClick={() => { fetchLocations(addressId) }}>{ notLocation ? 'Select' : 'Change'} Pickup Location</Button>}
                </div>
            </Card>
        </>
  )
}

SelectPickupLocation.propTypes = {
  addressId: PropTypes.string.isRequired,
  pickupStations: PropTypes.array.isRequired,
  myPickupLocation: PropTypes.func.isRequired,
  selectedPickupLocation: PropTypes.object.isRequired,
  handleSelectPickupLocation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    pickupStations: state.pickupStationReducer.customerPickupStations
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    myPickupLocation: (locationId) => dispatch(handleGetCustomerPickupLocation(locationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPickupLocation)
