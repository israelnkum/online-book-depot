import React, {useEffect, useState} from 'react';
import parser from 'html-react-parser'
import {Col, Card, Row, Typography, Breadcrumb, Image, Space, Tag, Divider, Button, Spin, List} from "antd";
import {useDispatch} from "react-redux";
import {getCategoryItems, getItemDetail, getLandingCategories} from "../../../actions/categories/CategoryAction";
import {useParams} from "react-router";
import CategoryBanner from "../../category-items/category-banner";
import CategoryBreadcrumb from "../../category-items/category-breadcrumb";
import CategoryLink from "../categories/category-link";
import {Link} from "react-router-dom";
import OtherCategories from "../categories/other-categories";
import {ShoppingCartOutlined} from "@ant-design/icons";
const { Meta } = Card;
export default function ItemDetail() {
    const [loading, setLoading] = useState(true)
    const [loadCategories, setLoadCategories] = useState(true)
    const [loadItemDetail, setLoadItemDetail] = useState(true)
    const state = store.getState()
    const {itemDetail, categoryItems, categories} = state.categoryReducer
    const {id, name} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getItemDetail(id)).then(() => {
            setLoadItemDetail(false)
            dispatch(getCategoryItems(itemDetail.categoryId)).then(() => {
                setLoading(false)
            })
        })
        dispatch(getLandingCategories()).then(() => {
            setLoadCategories(false)
        })
    },[])
    return (
        <React.Fragment>
            <CategoryBanner heroText={name} >
                <Spin spinning={loadItemDetail}>
                    {
                        loadItemDetail === false &&
                        <CategoryBreadcrumb>
                            <Breadcrumb.Item>
                                <CategoryLink name={name} id={itemDetail.categoryId}>{name}</CategoryLink>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {itemDetail.name}
                            </Breadcrumb.Item>
                        </CategoryBreadcrumb>
                    }
                </Spin>
            </CategoryBanner>
            <Row style={{ marginTop: 25 }} justify={'center'} align={'top'} gutter={[15, 15]}>
                <Col span={16}>
                    <Spin spinning={loadItemDetail} tip={'Please wait...'}>
                        {
                            !loadItemDetail &&
                            <React.Fragment>
                                <Card style={{ marginBottom: 10 }}>
                                    <Row justify={'center'} align={'middle'} gutter={[15, 15]}>
                                        <Col span={8}>
                                            <Image alt={itemDetail.name} src={'/storage/images/items/'+itemDetail.file}/>
                                        </Col>
                                        <Col span={16}>
                                            <div>
                                                <Tag color="blue">{itemDetail.shop.name}</Tag>
                                                <Typography.Title level={4} style={{ fontWeight: "normal"}}>
                                                    {itemDetail.name}
                                                </Typography.Title>
                                                <Typography.Text>Brand: {itemDetail.brand.name}</Typography.Text>
                                            </div>
                                            <Divider/>
                                            <Space>
                                                <Typography.Title level={3} disabled={itemDetail.discountedPrice > 0} delete={itemDetail.discountedPrice > 0}>GHC {itemDetail.sellingPrice}</Typography.Title>
                                                {
                                                    itemDetail.discountedPrice > 0 &&
                                                    <Typography.Title  level={3} >{`GHC ${itemDetail.discountedPrice}`}</Typography.Title>
                                                }
                                            </Space>
                                            <Button icon={<ShoppingCartOutlined />} block type={'primary'} size={'large'} className={'primary'}>
                                                ADD TO CART
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card title={'Description'}>
                                    {parser(itemDetail.description)}
                                </Card>
                            </React.Fragment>
                        }
                    </Spin>
                </Col>
                <Col span={6}>
                    <Card title={
                        <Typography.Text>More items in category</Typography.Text>
                    } style={{ marginBottom: 10 }}>
                        <List style={{ padding: 0 }}>

                            {
                                loading ? 'Loading' :
                                    categoryItems
                                        .sort()
                                        .filter((cat) => cat.name !== name)
                                        .map((category) => (
                                            <Link  key={category.id} to={`/landing/category/${category.name}/${category.id}`}>
                                                <List.Item>
                                                    <Typography.Text>{category.name}</Typography.Text>
                                                    <div>22</div>
                                                </List.Item>
                                            </Link>
                                        ))
                            }
                        </List>
                    </Card>
                    <OtherCategories name={name}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}
