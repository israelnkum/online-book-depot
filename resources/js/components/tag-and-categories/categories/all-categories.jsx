import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import {Button, message, Popconfirm, Space, Table} from "antd";
import {useDispatch} from "react-redux";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {getAllCategories, deleteCategory} from "../../../actions/categories/CategoryAction";
import {CategoryForm, EditCategory} from "./category-form";
const { Column } = Table
function AllCategories(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState()
    const [record, setRecord] = useState()
    useEffect(() => {
        setLoading(true)
        dispatch(getAllCategories()).then((res) => {
            setLoading(false)
        })
    }, [])
    const handleDelete = (id) => {
        dispatch(deleteCategory(id)).then(() => {
            message.success('Category Deleted')
        }).catch((error) => {
            message.warning(error.response.data)
        })
    }
    return (
        <>
            <Table loading={loading} dataSource={props.categories} scroll={{ x: 50 }} rowKey={'id'}>
                <Column title="Name" dataIndex="name"/>
                <Column
                    title="Action"
                    render={(text, record) => (
                        <Space>
                            <CategoryForm formValues={record} btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}/>
                            {/*<EditCategory formValues={record} btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}/>*/}
                            <Popconfirm title="Sure to delete?" onConfirm={() => {handleDelete(record.id)}} cancelText={'No'} okText={'Yes'}>
                                <Button size={'small'} danger icon={<DeleteOutlined/>}/>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}
export default AllCategories;
AllCategories.propTypes = {
    categories: PropTypes.array.isRequired
}
