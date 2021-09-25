import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { useDispatch } from 'react-redux'
import { getAllShops, deleteShop } from '../../actions/shop/ShopAction'
import { ShopForm } from './shop-form'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
const { Column } = Table
function AllShop (props) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState()
  useEffect(() => {
    setLoading(true)
    dispatch(getAllShops()).then((res) => {
      setLoading(false)
    })
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteShop(id)).then(() => {
      message.success('Shop Deleted')
    }).catch((error) => {
      message.warning(error.response.data)
    })
  }
  return (
        <Table loading={loading} dataSource={props.shops} scroll={{ x: 50 }} rowKey={'id'}>
            <Column title="Name" dataIndex="name"/>
            <Column title="Phone Number" dataIndex="contactNumber"/>
            <Column title="Other Phone Number" dataIndex="contactNumberAlt" />
            <Column title="Email" dataIndex="email" />
            <Column title="Location" dataIndex="location" />
            <Column title="Address" dataIndex="address" />
            <Column
                title="Action"
                render={(text, record) => (
                    <Space>
                        <ShopForm formValues={record} btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}/>
                        <Popconfirm title="Sure to delete?" onConfirm={() => { handleDelete(record.id) }} cancelText={'No'} okText={'Yes'}>
                            <Button size={'small'} danger icon={<DeleteOutlined/>}/>
                        </Popconfirm>
                    </Space>
                )}
            />
        </Table>
  )
}
export default AllShop
AllShop.propTypes = {
  shops: PropTypes.array.isRequired
}
