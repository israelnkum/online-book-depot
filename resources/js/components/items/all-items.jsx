import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Button, message, Popconfirm, Space, Table, Typography } from 'antd'
import { connect } from 'react-redux'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ItemForm from './item-form'
import { deleteItem, getAllItems, getAllTags } from '../../actions/items/ItemAction'
import { getAllBrands } from '../../actions/brands/BrandAction'
import { getAllShops } from '../../actions/shop/ShopAction'
import { getAllCategories } from '../../actions/categories/CategoryAction'
const { Column } = Table
function AllItems (props) {
  const [loading, setLoading] = useState()
  const { getAllItems, getAllBrands, getAllShops, getAllCategories, getAllTags, deleteItem } = props
  useEffect(() => {
    setLoading(true)
    getAllItems().then(() => {
      setLoading(false)
    })
    getAllBrands()
    getAllShops()
    getAllCategories()
    getAllTags()
  }, [])

  const handleDelete = (id) => {
    deleteItem(id).then(() => {
      message.success('Shop Deleted')
    }).catch((error) => {
      message.warning(error.response.data)
    })
  }
  return (
        <Table loading={loading} dataSource={props.items} scroll={{ x: 50 }} rowKey={'id'}>
            <Column fixed={'left'} width={80} title="Avatar" render={(text, record) => (
                <Avatar size={50} src={'/storage/images/items/' + record.file}/>
            )}/>
            <Column title="Name" width={200}
                    render={(text, record) => (
                        <>
                            <Typography.Text>{record.name}</Typography.Text>
                        </>
                    )}/>
            <Column title="Category" dataIndex={['category', 'name']}/>
            <Column title="Shop" dataIndex={['shop', 'name']}/>
            <Column title="Qty In Stock" dataIndex="qtyInStock" />
            <Column title="Selling Price" dataIndex="sellingPrice" />
            <Column title="Discounted Price" dataIndex="discountedPrice" />
            <Column
                title="Action"
                render={(text, record) => (
                    <Space>
                        <ItemForm formValues={record} btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}/>
                        <Popconfirm title="Sure to delete?" onConfirm={() => { handleDelete(record.id) }} cancelText={'No'} okText={'Yes'}>
                            <Button size={'small'} danger icon={<DeleteOutlined/>}/>
                        </Popconfirm>
                    </Space>
                )}
            />
        </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.itemReducer.items
  }
}
const mapDispatchToProps = (dispatch) => ({
  getAllItems: () => dispatch(getAllItems()),
  getAllBrands: () => dispatch(getAllBrands()),
  getAllShops: () => dispatch(getAllShops()),
  getAllCategories: () => dispatch(getAllCategories()),
  getAllTags: () => dispatch(getAllTags()),
  deleteItem: (id) => dispatch(deleteItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
