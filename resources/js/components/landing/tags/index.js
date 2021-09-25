import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Space, Spin, Typography } from 'antd'
import { connect } from 'react-redux'
import { getItemsByTags } from '../../../actions/items/ItemAction'
import PropTypes from 'prop-types'
import ItemLink from '../item-detail/item-link'
import ImgComponent from '../../commons/ImgComponent'

const Tags = (props) => {
  const { getTagItems, tagItems } = props
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getTagItems().then(() => {
      setLoading(false)
    })
  }, [])
  return (
     <Spin spinning={loading}>
         <Card>
             <Row align={'stretch'} gutter={[10, 10]}>
                 {
                     tagItems.map((tag) => (
                       tag.items.length > 0 &&
                         <>
                             <Col span={24} sm={24} xl={24} lg={24} xxl={24}>
                                 <div align={'left'} style={{ marginTop: 20, marginBottom: 20 }}>
                                     <Typography.Text className={'sectionTitle'}>
                                         {tag.name}
                                     </Typography.Text>
                                 </div>
                             </Col>
                             {
                                 tag.items.map((item) => (
                                     <Col key={item.id} xs={20} sm={4} lg={4} md={4} xl={4} xxl={3}>
                                         <ItemLink categoryName={item.category.name} itemName={item.name} itemId={item.id}>
                                             <Card
                                                 hoverable
                                                 cover={<ImgComponent alt={item.name} path={`/storage/images/items/${item.file || 'default-book.png'}`}/>}
                                             >
                                                 <Card.Meta description={
                                                     <Space>
                                                         <Typography.Text disabled={item.discountedPrice > 0} delete={item.discountedPrice > 0}>{`GHC ${item.sellingPrice}`}</Typography.Text>
                                                         {item.discountedPrice > 0 && <Typography.Text>{`GHC ${item.discountedPrice}`}</Typography.Text> }
                                                     </Space>
                                                 } />
                                                 <span>{item.name}</span>
                                             </Card>
                                         </ItemLink>
                                     </Col>
                                 ))
                             }
                         </>
                     ))
                 }
             </Row>
         </Card>
     </Spin>
  )
}

Tags.propTypes = {
  tagItems: PropTypes.array,
  getTagItems: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    tagItems: state.itemReducer.tagItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTagItems: (item) => dispatch(getItemsByTags(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags)
