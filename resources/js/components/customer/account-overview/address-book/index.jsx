import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { AddressForm } from './address-form'
import AllAddresses from './all-addresses'

export default function AddressBook (props) {
  return (
        <Card
            title={'Address Book'}
            size={'small'}
            extra={
                <AddressForm btnIcon={<PlusOutlined style={{ cursor: 'pointer' }}/>} formValues={{ id: '0', userId: props.userDetail.id }}/>
            }
        >
           <AllAddresses/>
        </Card>
  )
}
AddressBook.propTypes = {
  userDetail: PropTypes.object.isRequired
}
