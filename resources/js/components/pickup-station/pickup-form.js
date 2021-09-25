import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Input, Row, Col, Space, message, InputNumber, Select } from 'antd'
import { connect } from 'react-redux'
import { handleAddNewPickupStation, handleUpdatePickupStation } from '../../actions/pickup-stations/Action'
import { PlusOutlined } from '@ant-design/icons'
import { regions } from '../../utils'

const PickupForm = (props) => {
  const { newStation, updateStation } = props
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = (values) => {
    (values.id === 0 ? newStation(values) : updateStation(values))
      .then(() => {
        message.success('Station ' + (values.id === '0' ? 'Created' : 'Updated'))
        form.resetFields()
        handleOk(false)
      }).catch((error) => {
        message.warning(error.response.data)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
        <>
            <Button size={'small'} onClick={showModal} icon={props.btnIcon}>
                {props.btnText}
            </Button>
            <Modal title="New Pickup Station"

                   visible={isModalVisible}
                   footer={null}
                   onOk={handleOk}
                   onCancel={handleCancel} >
                <Form
                    layout={'vertical'}
                    name="add-brand-from"
                    form={form}
                    initialValues={props.formValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={[15, 15]}>
                        <Col span={24} xs={24} sm={24} lg={12} md={12}>
                            <Form.Item label="Name" name="name" rules={[
                              {
                                required: true,
                                message: 'Required'
                              }
                            ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={24} lg={12} md={12}>
                            <Form.Item label="Contact Person" name="contactPerson" rules={[
                              {
                                required: true,
                                message: 'Required'
                              }
                            ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={16} lg={16} md={16}>
                            <Form.Item label="Nearest Land Mark" name="nearestLandMark">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={8} lg={8} md={8}>
                            <Form.Item label="(GH¢) Delivery Fee" name="shippingFee" rules={[
                              {
                                required: true,
                                message: 'Required'
                              }
                            ]}>
                                <InputNumber style={{ width: '100%' }}/>
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={24} lg={12} md={12}>
                            <Form.Item label="Phone Number" name="phoneNumber" rules={[
                              {
                                required: true,
                                message: 'Required'
                              }
                            ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={24} lg={12} md={12}>
                            <Form.Item label="Phone Number (Alt)" name="phoneNumberAlt">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24} xs={24} sm={24} lg={16} md={16}>
                            <Form.Item label="Address" name="address" rules={[
                              {
                                required: true,
                                message: 'Required'
                              }
                            ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={8} lg={8}>
                            <Form.Item name="region" label="Region" rules={[{ required: true, message: 'Required' }]}>
                                <Select placeholder="Select Region" allowClear showSearch>
                                    {
                                        regions.map((region) => {
                                          return (
                                                <Select.Option key={region} value={region}>
                                                    {region}
                                                </Select.Option>
                                          )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={24} lg={24} md={24}>
                            <Form.Item label="Additional Info" name="additionalInfo">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={24} lg={24}>
                            <Form.Item
                                label="ID"
                                name="id"
                                hidden
                                rules={[
                                  {
                                    required: true,
                                    message: 'Required'
                                  }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Space>
                                <Button size={'small'} type="default" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button size={'small'} type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
  )
}
PickupForm.propTypes = {
  formValues: PropTypes.object,
  btnText: PropTypes.string,
  btnIcon: PropTypes.node,
  newStation: PropTypes.func.isRequired,
  updateStation: PropTypes.func.isRequired
}

PickupForm.defaultProps = {
  formValues: {
    id: 0
  },
  btnText: '',
  btnIcon: <PlusOutlined/>
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newStation: (data) => dispatch(handleAddNewPickupStation(data)),
    updateStation: (data) => dispatch(handleUpdatePickupStation(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PickupForm)
