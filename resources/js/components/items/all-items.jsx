import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import {Avatar, Badge, Button, message, Popconfirm, Space, Table, Tag, Typography} from "antd";
import {useDispatch} from "react-redux";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import parse from 'html-react-parser'
import {ItemForm} from "./item-form";
import {getAllItems, getAllTags} from "../../actions/items/ItemAction";
import {getAllBrands} from "../../actions/brands/BrandAction";
import {getAllShops} from "../../actions/shop/ShopAction";
import {getAllCategories} from "../../actions/categories/CategoryAction";
const { Column } = Table
function AllItems(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState()
    useEffect(() => {
        setLoading(true)
        dispatch(getAllItems()).then((res) => {
            setLoading(false)
        })
        dispatch(getAllBrands())
        dispatch(getAllShops())
        dispatch(getAllCategories())
        dispatch(getAllTags())
    }, [])

    const handleDelete = (id) => {
        dispatch(deleteItem(id)).then(() => {
            message.success('Shop Deleted')
        }).catch((error) => {
            message.warning(error.response.data)
        })
    }
    return (
        <>
            <ItemForm tags={props.tags} categories={props.categories} shops={props.shops} brands={props.brands}  btnIcon={<PlusOutlined style={{ cursor: 'pointer' }}/>} btnText={'New Shop'}/>

            <Table loading={loading} dataSource={props.items} scroll={{ x: 50 }} rowKey={'id'}>
                <Column fixed={'left'} width={80} title="Avatar" render={(text, record) => (
                    <Badge count={<EditOutlined type={'button'} />}>
                        <Avatar size={50} src={'/storage/images/items/'+record.file}/>
                    </Badge>
                )}/>
                <Column title="Name" width={200}
                        render={(text, record) => (
                            <>
                                <Typography.Text>{record.name}</Typography.Text>
                                <br/>
                                <Tag color={'blue'}>{record.brand.name}</Tag>
                            </>
                        )}/>
                <Column title="Category" dataIndex={['category','name']}/>
                <Column title="Shop" dataIndex={['shop','name']}/>
                <Column title="Qty In Stock" dataIndex="qtyInStock" />
                <Column title="Selling Price" dataIndex="sellingPrice" />
                <Column title="Discounted Price" dataIndex="discountedPrice" />
                <Column title="Show If Completed" dataIndex="showIfCompleted" />
                <Column
                    title="Action"
                    render={(text, record) => (
                        <Space>
                            {/*<ItemFormContainer formValues={record} btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}/>*/}
                            <ItemForm tags={props.tags} categories={props.categories} shops={props.shops} brands={props.brands} formValues={record} btnIcon={<EditOutlined style={{ cursor: 'pointer' }}/>}/>
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
export default AllItems;
AllItems.propTypes = {
    items: PropTypes.array.isRequired,
    brands: PropTypes.array.isRequired,
    shops: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
}
