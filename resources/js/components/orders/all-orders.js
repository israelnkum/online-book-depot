import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { handleGetAllOrders } from '../../actions/orders/OrderActions'
import { connect } from 'react-redux'
import OrderDetail from './order-detail'
import { useLocation } from 'react-router-dom'
const { Column } = Table
function AllOrders (props) {
  const location = useLocation()
  const { orders, getAllOrders } = props
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAllOrders(location.pathname).then((res) => {
      setLoading(false)
    })
  }, [])

  return (
      <Table style={{ zIndex: -1 }} loading={loading} dataSource={orders} scroll={{ x: 50 }} rowKey={'id'}>
          <Column title="Customer Name" dataIndex={['customer', ['name']]}/>
          <Column title="Order #" dataIndex="orderNumber"/>
          <Column title="Items in Order" dataIndex="itemCount"/>
          <Column
              title="Status"
              render={(text, record) => (
                  <Tag color={ record.color}>{record.status}</Tag>
              )}
          />
          <Column
              title="Details"
              render={(text, record) => (
                  <OrderDetail orderDetail={record} orderId={record.id}/>
              )}
          />
      </Table>
  )
}

AllOrders.propTypes = {
  orders: PropTypes.array.isRequired,
  getAllOrders: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    orders: state.ordersReducer.orders
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllOrders: (type) => dispatch(handleGetAllOrders(type))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
