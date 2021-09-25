import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Card, Row, Typography, Spin, Badge, Space, Empty } from 'antd'
import { connect } from 'react-redux'
import { getLandingItems } from '../../../actions/items/ItemAction'
import CategoryBanner from '../../category-items/category-banner'
import ItemLink from '../item-detail/item-link'
import ImgComponent from '../../commons/ImgComponent'
const Shop = (props) => {
  const [loadingItems, setLoadingItems] = useState(true)
  const { allItems, fetchLandingItems } = props

  useEffect(() => {
    fetchLandingItems().then(() => {
      setLoadingItems(false)
    })
  }, [])
  return (
        <>
            <CategoryBanner heroText={'All Items'} />
            <Row style={{ marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20 }} justify={'center'} gutter={[15, 15]}>
                <Col xs={{ span: 24 }} lg={{ span: 18 }} md={{ span: 18 }}>
                    <Card title={'Items from all categories'}>
                        <Spin spinning={loadingItems}>
                            {
                                allItems.length > 0
                                  ? <Row gutter={[15, 5]}>
                                        {
                                            allItems.map((item) => (
                                                <Col key={item.id} xs={{ span: 24 }} sm={8} lg={6} md={6}>
                                                    <Badge count={0}>
                                                        <ItemLink categoryName={item.name} itemName={item.name} itemId={item.id}>
                                                            <Card
                                                                hoverable
                                                                cover={<ImgComponent alt={item.name} path={`/storage/images/items/${item.file || 'default-book.png'}`}/>}>
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
                    {/* <OtherCategories name={name}/> */}
                </Col>
            </Row>
        </>
  )
}

Shop.propTypes = {
  allItems: PropTypes.array,
  fetchLandingItems: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    allItems: state.itemReducer.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLandingItems: () => dispatch(getLandingItems())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shop)
