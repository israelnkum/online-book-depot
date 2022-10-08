import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { useDispatch } from 'react-redux'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { BrandForm } from './brand-form'
import { getAllBrands, deleteBrand } from '../../../actions/brands/BrandAction'
const { Column } = Table
function AllBrands (props) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState()
  useEffect(() => {
    setLoading(true)
    dispatch(getAllBrands()).then((res) => {
      setLoading(false)
    })
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteBrand(id)).then(() => {
      message.success('Brand Deleted')
    }).catch((error) => {
      message.warning(error.response.data)
    })
  }
  return (
        <>
            <Table loading={loading} dataSource={props.brands} scroll={{ x: 50 }} rowKey={'id'}>
                <Column title="Name" dataIndex="name"/>
                <Column
                    title="Action"
                    render={(text, record) => (
                        <Space>
                            <BrandForm formValues={record} btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}/>
                            <Popconfirm title="Sure to delete?" onConfirm={() => { handleDelete(record.id) }} cancelText={'No'} okText={'Yes'}>
                                <Button size={'small'} danger icon={<DeleteOutlined/>}/>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </>
  )
}
export default AllBrands
AllBrands.propTypes = {
  brands: PropTypes.array.isRequired
}
