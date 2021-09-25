import React, { useEffect, useState } from 'react'
import { Col, Card, Row, Typography, List } from 'antd'
import { useDispatch } from 'react-redux'
import { getLandingCategories } from '../../actions/categories/CategoryAction'
import CategoryBanner from './category-banner'
import { useParams } from 'react-router'
import CategoryLink from '../landing/categories/category-link'
export default function Index () {
  const [loading, setLoading] = useState(true)
  const state = store.getState()
  const { name } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLandingCategories()).then(() => {
      setLoading(false)
    })
  }, [])
  return (
        <React.Fragment>
            <CategoryBanner heroText={name}/>
            <Card bordered={false} style={{ marginTop: 10, marginBottom: 35 }}>
                <Row justify={'center'} align={'stretch'} gutter={[15, 15]}>
                    <Col xs={{ span: 24 }} lg={{ span: 18 }} md={{ span: 18 }}>
                        <Typography.Text className={'sectionTitle'}>
                            Categories
                        </Typography.Text>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 6 }}>
                        <List header={
                            <Typography.Text className={'sectionTitle'}>
                                Categories
                            </Typography.Text>
                        } bordered>

                            {
                                loading
                                  ? 'Loading'
                                  : state.categoryReducer.categories
                                    .sort()
                                    .filter((cat) => cat.name !== name)
                                    .map((category) => (
                                            <CategoryLink key={category.id} name={category.name} id={category.id}>
                                                <List.Item key={category.id}>
                                                    <Typography.Text>{category.name}</Typography.Text> 399
                                                </List.Item>
                                            </CategoryLink>
                                    ))
                            }
                        </List>
                    </Col>
                </Row>
            </Card>
        </React.Fragment>
  )
}
