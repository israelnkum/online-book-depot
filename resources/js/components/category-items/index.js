import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Card, Row, Typography, Spin, Badge, Space, Empty, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { getCategoryItems, getLandingCategories } from '../../actions/categories/CategoryAction'
import CategoryBanner from './category-banner'
import { useParams } from 'react-router'
import ItemLink from '../landing/item-detail/item-link'
import CategoryBreadcrumb from './category-breadcrumb'
import CategoryLink from '../landing/categories/category-link'
import OtherCategories from '../landing/categories/other-categories'
import ImgComponent from '../commons/ImgComponent'
const CategoryItems = (props) => {
  const [loading, setLoading] = useState(true)
  const [loadingItems, setLoadingItems] = useState(true)
  const { categoryItems, getLandingCategories, getCategoryItems } = props
  const { name, id } = useParams()
  useEffect(() => {
    setLoading(true)
    getLandingCategories().then(() => {
      setLoading(false)
    })
    setLoadingItems(true)
    getCategoryItems(id).then(() => {
      setLoadingItems(false)
    })
  }, [id])
  return (
        <React.Fragment>
            <CategoryBanner heroText={name} >
                <CategoryBreadcrumb>
                    <Breadcrumb.Item>
                        <CategoryLink name={name} id={id}>{name}</CategoryLink>
                    </Breadcrumb.Item>
                </CategoryBreadcrumb>
            </CategoryBanner>
            <Row style={{ marginTop: 10, marginBottom: 35 }} justify={'center'} align={'stretch'} gutter={[15, 15]}>
                <Col xs={{ span: 24 }} lg={{ span: 18 }} md={{ span: 18 }}>
                    <Card>
                        <Spin spinning={loadingItems}>
                            {
                                categoryItems.length > 0
                                  ? <Row gutter={[15, 5]}>
                                        {
                                            categoryItems.map((item) => (
                                                <Col key={item.id} xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 5 }}>
                                                    <Badge count={0}>
                                                        <ItemLink categoryName={item.category.name} itemName={item.name} itemId={item.id}>
                                                            <Card
                                                                hoverable
                                                                cover={<ImgComponent alt={item.name} path={`/storage/images/items/${item.file || 'default-book.png'}`}/>}
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
                                    </Row>
                                  : <div align={'center'}>
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

CategoryItems.propTypes = {
  categoryItems: PropTypes.array.isRequired,
  getLandingCategories: PropTypes.func.isRequired,
  getCategoryItems: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    categoryItems: state.categoryReducer.categoryItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLandingCategories: () => dispatch(getLandingCategories()),
    getCategoryItems: (id) => dispatch(getCategoryItems(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryItems)
