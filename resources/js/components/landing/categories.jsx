import React from 'react';
import {Layout, Col, Card, Menu, Row, Space, Button, Typography} from "antd";
const { Meta } = Card;
export default function Categories() {
    return (
        <Card bordered={false} style={{marginTop: 35, marginBottom: 35}}>
            <Row justify={'center'} align={'stretch'} gutter={[15, 15]}>
                <Col span={24}>
                    <Typography.Text className={'sectionTitle'}>
                        Categories
                    </Typography.Text>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 6 }}>
                    <Card
                        hoverable
                        cover={<img alt="example" src="/storage/assets/slider/slider1.jpg" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 6 }}>
                    <Card
                        hoverable

                        cover={<img alt="example" src="/storage/assets/slider/slider1.jpg" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 6 }}>
                    <Card
                        hoverable

                        cover={<img alt="example" src="/storage/assets/slider/slider4.jpg" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 6 }}>
                    <Card
                        hoverable

                        cover={<img alt="example" src="/storage/assets/slider/slider4.jpg" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
            </Row>
        </Card>
    )
}
