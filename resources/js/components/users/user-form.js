import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Input, Row, Col, Space, message } from 'antd'
import { connect } from 'react-redux'
import { handleAddNewUser, handleUpdateUser } from '../../actions/users/UsersActions'

const UserForm = (props) => {
  const { addUser, formValues, updateUser } = props
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
    (values.id === 0 ? addUser(values) : updateUser(values)).then(() => {
      message.success('Admin ' + (values.id === 0 ? 'Added' : 'Updated'))
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
            <Modal title="New Admin"
                   visible={isModalVisible}
                   footer={null}
                   onOk={handleOk}
                   onCancel={handleCancel} >
                <Form
                    layout={'vertical'}
                    name="add-address-from"
                    form={form}
                    initialValues={formValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={[5, 5]}>
                        <Col span={12} xs={24} sm={12} lg={12}>
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
                        <Col span={12} xs={24} sm={12} lg={12}>
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
                                label="Email"
                                name="email"
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
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Form.Item
                                hidden={formValues.id !== 0}
                                label="Password"
                                name="password"
                                rules={[
                                  {
                                    required: formValues.id === 0,
                                    message: 'Required'
                                  }
                                ]}
                            >
                                <Input disabled={formValues.id !== 0}/>
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Form.Item
                                hidden={formValues.id !== 0}
                                label="Confirm Password"
                                name="password_confirmation"
                                rules={[
                                  {
                                    required: formValues.id === 0,
                                    message: 'Required'
                                  }
                                ]}
                            >
                                <Input disabled={formValues.id !== 0}/>
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
UserForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  btnIcon: PropTypes.node.isRequired,
  addUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  btnText: PropTypes.string
}
const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(handleAddNewUser(data)),
    updateUser: (data) => dispatch(handleUpdateUser(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
