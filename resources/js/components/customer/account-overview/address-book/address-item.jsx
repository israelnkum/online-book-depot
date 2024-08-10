import React from 'react'
import PropTypes from 'prop-types'
import { List, Tag, Space } from 'antd'

export const AddressItem = (props) => {
  const { addressObj, action } = props
  return (
    addressObj
      ? <List.Item>
          <List.Item.Meta
              title={addressObj.name}
              description={
                  <>
                      {addressObj.address} <br/>
                      {addressObj.city + ',' + addressObj.region} <br/>
                      {addressObj.phoneNumber + '' + (addressObj.phoneNumberAlt !== null ? '/' + addressObj.phoneNumberAlt : '')}
                  </>
              }
          />
          <Space direction={'vertical'}>
              {addressObj.default === 1 && <Tag color={'green'}>Default</Tag>}
              {action}
          </Space>
      </List.Item>
      : <>-</>
  )
}

AddressItem.propTypes = {
  addressObj: PropTypes.object,
  action: PropTypes.node
}
