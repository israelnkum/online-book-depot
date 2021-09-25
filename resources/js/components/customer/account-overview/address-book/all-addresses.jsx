import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'
import { connect, useDispatch } from 'react-redux'
import { getAllAddress } from '../../../../actions/user/UserAction'
import { AddressItem } from './address-item'
import { AddressForm } from './address-form'
import { EditOutlined } from '@ant-design/icons'
const AllAddresses = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllAddress())
  }, [])
  return (
      <List
          itemLayout="horizontal"
          dataSource={props.addressBook}
          renderItem={item => (
              <AddressItem addressObj={item}
                           action={
                               <AddressForm
                                   btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}
                                   formValues={item}/>
                           }
              />
          )}
      />
  )
}

AllAddresses.propTypes = {
  addressBook: PropTypes.array.isRequired,
  myPickupLocation: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    addressBook: state.userReducer.addressBook
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAddress: () => dispatch(getAllAddress())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAddresses)
