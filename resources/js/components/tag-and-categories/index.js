import React from 'react'
import { Card, Col, Row } from 'antd'
import Categories from './categories'
import Brands from './brands'
import { BrandForm } from './brands/brand-form'
import { PlusOutlined } from '@ant-design/icons'
import CategoryForm from './categories/category-form'
import AppPageHeader from '../commons/app-page-header'
const TagsAndCategories = () => {
  return (
        <>
            <AppPageHeader title={'Brands & Categories'}/>
            <Row gutter={[5, 5]}>
                <Col span={12} xs={24} sm={24} md={12} lg={12}>
                    <Card size={'small'} title={'Brands'} extra={
                        <BrandForm formValues={{ id: '0' }} btnIcon={<PlusOutlined style={{ cursor: 'pointer' }}/>} btnText={'Add'}/>
                    }>
                        <Brands/>
                    </Card>
                </Col>
                <Col span={12} xs={24} sm={24} md={12} lg={12}>
                    <Card size={'small'} title={'Categories'} extra={
                        <CategoryForm formValues={{ id: '0' }} editing={false} btnIcon={<PlusOutlined style={{ cursor: 'pointer' }}/>} btnText={'Add'}/>
                    }>
                        <Categories/>
                    </Card>
                </Col>
            </Row>
        </>
  )
}
export default TagsAndCategories
