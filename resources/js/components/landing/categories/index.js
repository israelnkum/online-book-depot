import React, {useEffect, useState} from 'react';
import {Col, Card, Row, Typography} from "antd";
import {useDispatch} from "react-redux";
import {getLandingCategories} from "../../../actions/categories/CategoryAction";
import {Link} from "react-router-dom";
import CategoryLink from "./category-link";
const { Meta } = Card;
export default function Categories() {
    const [loading, setLoading] = useState(true)
    const state = store.getState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLandingCategories()).then(() => {
            setLoading(false)
        })
    },[])
    return (
        <Card bordered={false} style={{marginTop: 35, marginBottom: 35}}>
            <Row justify={'center'} align={'stretch'} gutter={[15, 15]}>
                <Col span={24}>
                    <Typography.Text className={'sectionTitle'}>
                        Categories
                    </Typography.Text>
                </Col>
                {
                    loading ? 'Loading' :
                        state.categoryReducer.categories.map((category) => (
                            <Col key={category.id} xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 6 }}>
                                <CategoryLink name={category.name} id={category.id}>
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src="/storage/assets/slider/slider1.jpg" />}
                                    >
                                        <Meta title={category.name} description="www.instagram.com" />
                                    </Card>
                                </CategoryLink>
                            </Col>
                        ))
                }
            </Row>
        </Card>
    )
}
