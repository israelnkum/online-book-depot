import React, { useEffect, useState } from 'react'
import { Col, Card, Row, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { getLandingCategories } from '../../../actions/categories/CategoryAction'
import CategoryLink from './category-link'
import ImgComponent from '../../commons/ImgComponent'
const { Meta } = Card
export default function Categories () {
  const [loading, setLoading] = useState(true)
  const state = store.getState()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLandingCategories()).then(() => {
      setLoading(false)
    })
  }, [])
  return (
      <Card>
          <Row justify={'center'} align={'stretch'} gutter={[10, 10]}>
              <Col span={24} sm={24} xl={24} lg={24} xxl={24}>
                  <div align={'left'} style={{ marginTop: 20, marginBottom: 20 }}>
                      <Typography.Text className={'sectionTitle'}>
                          Categories
                      </Typography.Text>
                  </div>
              </Col>
              {
                  loading
                    ? 'Loading'
                    : state.categoryReducer.categories.map((category) => (
                          <Col key={category.id} xs={20} sm={4} lg={4} md={4} xl={4} xxl={3}>
                              <CategoryLink name={category.name} id={category.id}>
                                  <Card hoverable
                                        cover={<ImgComponent alt={category.name} path={`/storage/images/categories/${category.file || 'default-category.jpeg'}`}/>}>
                                      <Meta title={category.name} />
                                  </Card>
                              </CategoryLink>
                          </Col>
                    ))
              }
          </Row>
      </Card>
  )
}
