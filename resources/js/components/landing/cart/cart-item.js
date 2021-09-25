import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, message, Select, Space, Spin, Table, Tag, Popconfirm, Typography } from 'antd'
import { handleRemoveFromCart, handleUpdateCart } from '../../../actions/cart/CartActions'
import { connect } from 'react-redux'
const CartItem = (props) => {
  const { handleUpdateCart, handleRemove } = props
  const [adding, setAddingToCart] = useState(false)
  const { Column } = Table
  const children = []
  for (let i = 1; i <= 20; i++) {
    children.push(<Select.Option key={i} value={i}>{i}</Select.Option>)
  }

  const removeItemFromCart = (itemId) => {
    handleRemove(itemId).then(() => {
      message.success('Item removed')
    })
  }

  const updateItemInCart = (data) => {
    setAddingToCart(true)
    handleUpdateCart(data).then(() => {
      message.success('Cart updated')
      setAddingToCart(false)
    })
  }
  return (
      <Spin spinning={adding}>
          <Table dataSource={props.data} rowKey={'itemId'}>
              <Column
                  title="Image"
                  render={(text, record) => (
                      <img height={'auto'} width={80} src={`/storage/images/items/${record.item.image || 'default-book.png'}`} alt={record.item.name}/>
                  )}
              />

              <Column
                  title="Item"
                  render={(text, record) => (
                      <Space direction={'vertical'} size={'small'}>
                          <Tag color={'blue'}>{record.item.seller}</Tag>
                          <Typography.Text>{record.item.name}</Typography.Text>
                          <Popconfirm
                              title="Sure to remove?"
                              onConfirm={() => { removeItemFromCart(record.item.id) }}
                              okText={'Yes'}
                              cancelText={'Ignore'}
                          >
                          <Button size={'small'} type={'primary'}>Remove</Button>
                          </Popconfirm>
                      </Space>
                  )}
              />

              <Column
                  title="Quantity"
                  render={(text, record) => (
                      <Select defaultValue={record.qty} style={{ width: 80 }}
                              onChange={(value) => {
                                updateItemInCart({
                                  itemId: record.item.id, qty: value - record.qty
                                })
                              }}>
                          {children}
                      </Select>
                  )}
              />
              <Column
                  title="Unit Price"
                  render={(text, record) => (
                      <Space direction={'vertical'} size={'small'}>
                          {
                              record.discountedPrice > 0 &&
                              <Typography.Text >{`GHC ${record.discountedPrice}`}</Typography.Text>
                          }
                          <Typography.Text disabled={record.discountedPrice > 0} delete={record.discountedPrice > 0}>GHC {record.sellingPrice}</Typography.Text>
                      </Space>
                  )}
              />
              <Column
                  title="Sub Total"
                  render={(text, record) => {
                    return (
                          <Typography.Text >GHC {record.unitPrice * record.qty}</Typography.Text>
                    )
                  }}
              />
          </Table>
      </Spin>
  )
}

CartItem.propTypes = {
  data: PropTypes.array.isRequired,
  handleUpdateCart: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdateCart: (item) => dispatch(handleUpdateCart(item)),
    handleRemove: (itemId) => dispatch(handleRemoveFromCart(itemId))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
