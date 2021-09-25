import React, { useState } from 'react'
import { Col, Comment, Modal, Row } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const StationDetail = (props) => {
  const { detail } = props
  const [visible, setVisible] = useState(false)
  return (
        <>
            <MoreOutlined onClick={() => setVisible(true)}/>
            <Modal title={detail.name} centered visible={visible} footer={null} onCancel={() => setVisible(false)} width={1000}>
                <Row gutter={[15, 15]}>
                    <Col>
                        <Comment author={'Contact Person'} content={<p>{detail.contactPerson}</p>}/>
                    </Col>
                    <Col>
                        <Comment author={'Phone Number'} content={<p>{detail.phoneNumber} | {detail.phoneNumberAlt}</p>}/>
                    </Col>
                    <Col>
                        <Comment author={'Shipping Fee'} content={<p>GH¢{detail.shippingFee}</p>}/>
                    </Col>
                </Row>
                <Row gutter={[15, 15]}>
                    <Col>
                        <Comment author={'Nearest Landmark'} content={<p>{detail.nearestLandMark}</p>}/>
                    </Col>
                    <Col>
                        <Comment author={'Address'} content={<p>{detail.address}</p>}/>
                    </Col>
                </Row>
                <Comment author={'Additional Information'} content={<p>{detail.additionalInfo}</p>}/>
            </Modal>
        </>
  )
}
StationDetail.propTypes = {
  detail: PropTypes.object.isRequired
}
export default StationDetail
