import React, {useEffect, useState} from 'react';
import {Col, Card, Row, Typography, List,Spin, Badge,Space,Empty,Breadcrumb} from "antd";
import {useDispatch} from "react-redux";
import {getCategoryItems, getLandingCategories} from "../../actions/categories/CategoryAction";
import CategoryBanner from "./category-banner";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import ItemLink from "../landing/item-detail/item-link";
import CategoryBreadcrumb from "./category-breadcrumb";
import CategoryLink from "../landing/categories/category-link";
import OtherCategories from "../landing/categories/other-categories";
export default function CategoryItems() {
    const [loading, setLoading] = useState(true)
    const [loadingItems, setLoadingItems] = useState(true)
    const state = store.getState()
    const { categories, categoryItems } = state.categoryReducer
    const { name, id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLandingCategories()).then(() => {
            setLoading(false)
        })
        dispatch(getCategoryItems(id)).then(() => {
            setLoadingItems(false)
        })
    },[])
    return (
        <React.Fragment>
            <CategoryBanner heroText={name} >
                <CategoryBreadcrumb>
                    <Breadcrumb.Item>
                        <CategoryLink name={name} id={id}>{name}</CategoryLink>
                    </Breadcrumb.Item>
                </CategoryBreadcrumb>
            </CategoryBanner>
            <Row style={{marginTop: 10, marginBottom: 35}} justify={'center'} align={'stretch'} gutter={[15, 15]}>

                <Col  xs={{ span: 24 }} lg={{ span: 18 }} md={{ span: 18 }}>
                    <Card>
                        <Spin spinning={loadingItems}>
                            {
                                categoryItems.length > 0 ?
                                    <Row gutter={[15,5]}>
                                        {
                                            categoryItems.map((item) => (
                                                <Col key={item.id} xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 5 }}>
                                                    <Badge count={5}>
                                                        <ItemLink categoryName={item.category.name} itemName={item.name} itemId={item.id}>
                                                            <Card
                                                                hoverable
                                                                cover={<img alt={item.name} src={'/storage/images/items/'+item.file} />}
                                                            >
                                                                <Card.Meta description={
                                                                    <Space>
                                                                        <Typography.Text disabled={item.discountedPrice > 0} delete={item.discountedPrice > 0}>{`GHC ${item.sellingPrice}`}</Typography.Text>
                                                                        {
                                                                            item.discountedPrice > 0 &&
                                                                            <Typography.Text>{`GHC ${item.discountedPrice}`}</Typography.Text>
                                                                        }
                                                                    </Space>
                                                                } />
                                                                <span>{item.name}</span>
                                                            </Card>
                                                        </ItemLink>
                                                    </Badge>
                                                </Col>
                                            ))
                                        }
                                    </Row> :
                                    <div align={'center'}>
                                        <Empty description={'Oops! No Items Found this category'}/>
                                    </div>
                            }
                        </Spin>
                    </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 6 }}>
                    <OtherCategories name={name}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}
