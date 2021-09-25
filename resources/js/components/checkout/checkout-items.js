import React from 'react'
import PropTypes from 'prop-types'
import { Space, Table } from 'antd'
const CheckoutItems = (props) => {
  const { Column } = Table

  return (
      <Table dataSource={props.data} rowKey={'itemId'} showHeader={false}>
          <Column
              render={(text, record) => (
                  <Space>
                      <img height={'auto'} width={50} src={`/storage/images/items/${record.item.image || 'default-book.png'}`} alt={record.item.name}/>
                      <small>{record.item.name} <br/>Qty: {record.qty} <br/>GH¢ {record.unitPrice}</small>
                  </Space>
              )}
          />
      </Table>
  )
}

CheckoutItems.propTypes = {
  data: PropTypes.array.isRequired
}

export default CheckoutItems
