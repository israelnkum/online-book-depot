import React, { useEffect, useState } from 'react'
import parser from 'html-react-parser'
import PropTypes from 'prop-types'
import { Col, Card, Row, Typography, Breadcrumb, Image, Space, Tag, Divider, message, Button, Spin, Input } from 'antd'
import { connect, useDispatch } from 'react-redux'
import { getItemDetail } from '../../../actions/categories/CategoryAction'
import { useParams } from 'react-router'
import CategoryBanner from '../../category-items/category-banner'
import CategoryBreadcrumb from '../../category-items/category-breadcrumb'
import CategoryLink from '../categories/category-link'
import OtherCategories from '../categories/other-categories'
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { handleAddItemToCart, handleUpdateCart } from '../../../actions/cart/CartActions'

const ItemDetail = (props) => {
  const { itemDetail, handleAddItemToCart, handleUpdateCart, alreadyInCart } = props
  const [addingToCart, setAddingToCart] = useState(false)
  const [qty, setQty] = useState(alreadyInCart === undefined ? 1 : alreadyInCart.qty)
  const [loadItemDetail, setLoadItemDetail] = useState(true)
  const { id, name } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    setQty(alreadyInCart === undefined ? 1 : alreadyInCart.qty)
    dispatch(getItemDetail(id)).then(() => {
      setLoadItemDetail(false)
      // dispatch(getCategoryItems(itemDetail.categoryId)).then(() => {
      //   setLoading(false)
      // })
    })
  }, [])

  const addItemToCart = () => {
    setAddingToCart(true)
    const data = {
      itemId: itemDetail.id,
      item: {
        id: itemDetail.id,
        image: itemDetail.file,
        name: itemDetail.name,
        seller: itemDetail.shop.name
      },
      shopId: itemDetail.shop.id,
      qty: 1,
      unitPrice: itemDetail.discountedPrice > 0 ? itemDetail.discountedPrice : itemDetail.sellingPrice,
      discountedPrice: itemDetail.discountedPrice,
      sellingPrice: itemDetail.sellingPrice
    }
    handleAddItemToCart(data).then(() => {
      alreadyInCart !== undefined && setQty(qty)
      message.success('Item add to cart')
      setAddingToCart(false)
    })
  }

  const updateItemInCart = (data) => {
    setAddingToCart(true)
    handleUpdateCart(data).then(() => {
      message.success('Cart updated')
      setAddingToCart(false)
    })
  }
  return (
        <React.Fragment>
            <Spin spinning={loadItemDetail}>
                {
                    loadItemDetail === false &&
                    <CategoryBanner heroText={itemDetail.category.name} >
                        <CategoryBreadcrumb>
                            <Breadcrumb.Item>
                                <CategoryLink name={itemDetail.category.name} id={itemDetail.categoryId}>{itemDetail.category.name}</CategoryLink>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {itemDetail.name}
                            </Breadcrumb.Item>
                        </CategoryBreadcrumb>
                    </CategoryBanner>
                }
            </Spin>
            <Row style={{ marginTop: 25 }} justify={'center'} align={'top'} gutter={[15, 15]}>
                <Col span={16} xs={24} sm={24} md={16}>
                    <Spin spinning={loadItemDetail} tip={'Please wait...'}>
                        {
                            !loadItemDetail &&
                            <React.Fragment>
                                <Card style={{ marginBottom: 10 }}>
                                    <Row justify={'center'} align={'middle'} gutter={[15, 15]}>
                                        <Col span={8} sm={24} xs={24} md={8}>
                                            <Image alt={itemDetail.name} src={`/storage/images/items/${itemDetail.file || 'default-book.png'}`}/>
                                        </Col>
                                        <Col span={16} sm={24} xs={24} md={16}>
                                            <div>
                                                <Tag color="blue">{itemDetail.shop.name}</Tag>
                                                <Typography.Title level={4} style={{ fontWeight: 'normal' }}>
                                                    {itemDetail.name}
                                                </Typography.Title>
                                                <Typography.Text>Brand: {itemDetail.brand.name}</Typography.Text>
                                            </div>
                                            <Divider/>
                                            <Space>
                                                <Typography.Title level={3} disabled={itemDetail.discountedPrice > 0} delete={itemDetail.discountedPrice > 0}>GHC {itemDetail.sellingPrice}</Typography.Title>
                                                {
                                                    itemDetail.discountedPrice > 0 &&
                                                    <Typography.Title level={3} >{`GHC ${itemDetail.discountedPrice}`}</Typography.Title>
                                                }
                                            </Space>
                                            <Spin spinning={addingToCart} tip={'Adding'}>
                                                <Input.Group compact>
                                                    {
                                                        alreadyInCart === undefined
                                                          ? <>
                                                                <Button style={{ width: '50%' }}
                                                                        onClick={() => { addItemToCart() }}
                                                                        type={'primary'} className={'primary'}>
                                                                    <ShoppingCartOutlined /> Add to Cart
                                                                </Button>
                                                            </>
                                                          : <>
                                                                <Button onClick={() => { updateItemInCart({ itemId: itemDetail.id, qty: -1 }) }} type={'primary'} className={'primary'}>
                                                                    <MinusOutlined/>
                                                                </Button>
                                                                <Button
                                                                    onClick={() => { updateItemInCart({ itemId: itemDetail.id, qty: 1 }) }}
                                                                    type={'primary'} className={'primary'}>
                                                                    <PlusOutlined />
                                                                </Button> <br/>
                                                                <Typography.Text className={'text-primary'}>{alreadyInCart.qty} (items) in cart</Typography.Text>
                                                            </>
                                                    }
                                                </Input.Group>
                                            </Spin>
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
                <Col span={6} xs={24} sm={24} md={6}>
                    {/* <Card title={
                        <Typography.Text>More items in category</Typography.Text>
                    } style={{ marginBottom: 10 }}>
                        <List style={{ padding: 0 }}>

                            {
                                loading
                                  ? 'Loading'
                                  : categoryItems
                                    .sort()
                                    .filter((cat) => cat.name !== name)
                                    .map((category) => (
                                            <Link key={category.id} to={`/landing/category/${category.name}/${category.id}`}>
                                                <List.Item>
                                                    <Typography.Text>{category.name}</Typography.Text>
                                                    <div>22</div>
                                                </List.Item>
                                            </Link>
                                    ))
                            }
                        </List>
                    </Card> */}
                    <OtherCategories name={name}/>
                </Col>
            </Row>
        </React.Fragment>
  )
}

ItemDetail.propTypes = {
  itemDetail: PropTypes.object.isRequired,
  categoryItems: PropTypes.array.isRequired,
  handleAddItemToCart: PropTypes.func.isRequired,
  handleUpdateCart: PropTypes.func.isRequired,
  alreadyInCart: PropTypes.object
}

ItemDetail.defaultPropTypes = {
  alreadyInCart: undefined
}

const mapStateToProps = (state) => {
  const currentItem = state.categoryReducer.itemDetail
  return {
    itemDetail: currentItem,
    categoryItems: state.categoryReducer.categoryItems,
    alreadyInCart: state.cartReducer.cartItems.find(itm => itm.item.id === currentItem.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddItemToCart: (item) => dispatch(handleAddItemToCart(item)),
    handleUpdateCart: (item) => dispatch(handleUpdateCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)
