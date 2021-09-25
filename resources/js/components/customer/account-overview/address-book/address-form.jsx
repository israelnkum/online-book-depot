import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Input, Row, Col, Space, message, Select, Checkbox } from 'antd'
import { useDispatch } from 'react-redux'
import { addAddressBook, editAddress } from '../../../../actions/user/UserAction'
import { regions } from '../../../../utils'

export const AddressForm = (props) => {
  const dispatch = useDispatch()
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
    dispatch(values.id === '0' ? addAddressBook(values) : editAddress(values)).then((res) => {
      message.success('Address ' + (values.id === '0' ? 'Created' : 'Updated'))
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
            <Button onClick={showModal} icon={props.btnIcon} type={'text'}/>
            <Modal title="Address"
                   visible={isModalVisible}
                   footer={null}
                   onOk={handleOk}
                   onCancel={handleCancel} >
                <Form
                    layout={'vertical'}
                    name="add-address-from"
                    form={form}
                    initialValues={props.formValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={[5, 5]}>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Form.Item
                                label="Surname"
                                name="surName"
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
                            <Form.Item
                                label="Other Names"
                                name="otherNames"
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
                            <Form.Item
                                label="Phone Number"
                                name="phoneNumber"
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
                            <Form.Item
                                label="Other Phone Number"
                                name="phoneNumberAlt"
                            >
                                <Input />
                            </Form.Item>
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
                            <Form.Item
                                label="UserId"
                                name="userId"
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
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Form.Item
                                label="City"
                                name="city"
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
                        <Col span={24} xs={24} sm={24} lg={24}>
                            <Form.Item
                                name={'address'}
                                label="Address"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Required'
                                  }
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={24} lg={24}>
                            <Form.Item
                                name={'additionalInfo'}
                                label="Additional Info"
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item valuePropName="checked" name="default">
                                <Checkbox>Set as default address</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Space>
                                <Button type="default" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button type="primary" htmlType="submit">
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

AddressForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  btnIcon: PropTypes.node.isRequired
}

AddressForm.defaultProps = {
  formValues: {
    default: true
  }
}
