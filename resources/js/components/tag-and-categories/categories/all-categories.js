import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Image, message, Popconfirm, Space, Table } from 'antd'
import { connect } from 'react-redux'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { getAllCategories, deleteCategory } from '../../../actions/categories/CategoryAction'
import CategoryForm from './category-form'

const { Column } = Table
function AllCategories (props) {
  const [loading, setLoading] = useState()
  const { categories, getAllCategories, deleteCategory } = props
  useEffect(() => {
    setLoading(true)
    getAllCategories().then(() => {
      setLoading(false)
    })
  }, [])
  const handleDelete = (id) => {
    deleteCategory(id).then(() => {
      message.success('Category Deleted')
    }).catch((error) => {
      message.warning(error.response.data)
    })
  }
  return (
        <Table loading={loading} dataSource={categories} scroll={{ x: 50 }} rowKey={'id'}>
            <Column title={'Image'} render={(text, record) => (
                <Image width={50} height={50} src={`/storage/images/categories/${record.file || 'default-category.jpeg'}`}/>
            )}
            />
            <Column title="Name" dataIndex="name"/>
            <Column title="Items" dataIndex="itemCount"/>
            <Column
                title="Action"
                render={(text, record) => (
                    <Space>
                        <CategoryForm formValues={record} btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}/>
                        <Popconfirm title="Sure to delete?" onConfirm={() => { handleDelete(record.id) }} cancelText={'No'} okText={'Yes'}>
                            <Button size={'small'} danger icon={<DeleteOutlined/>}/>
                        </Popconfirm>
                    </Space>
                )}
            />
        </Table>
  )
}

AllCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoryReducer.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
    deleteCategory: (id) => dispatch(deleteCategory(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)
