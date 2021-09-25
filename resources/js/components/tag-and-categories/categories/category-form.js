import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Input, Row, Col, Space, message } from 'antd'
import { connect } from 'react-redux'
import { addCategory, editCategory } from '../../../actions/categories/CategoryAction'
import ChangePicture from '../../items/change-picture'

const CategoryForm = (props) => {
  const { addCategory, editCategory } = props
  const [selectedFile, setSelectedFile] = useState(null)
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
    const formData = new FormData()
    formData.append('file', selectedFile)
    values.id !== '0' && formData.append('_method', 'PUT')
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) { formData.append(key, values[key]) }
    }

    (values.id === '0' ? addCategory(formData) : editCategory(formData))
      .then(() => {
        message.success('Category' + (values.id === '0' ? 'Created' : ' Updated'))
        form.resetFields()
        handleOk()
      }).catch((error) => {
        message.warning(error.response.data)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const uploadProps = {
    beforeUpload: (file) => {
      setSelectedFile(file)
      return true
    },
    listType: 'picture-card',
    maxCount: 1,
    onRemove: () => {
      setSelectedFile(null)
    },
    accept: 'image/*',
    method: 'get'
  }
  return (
        <React.Fragment>
            <Button size={'small'} onClick={showModal} icon={props.btnIcon}>
                {props.btnText}
            </Button>
            <Modal title="Category"
                   width={290}
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
                    <Row>
                        <Col span={24} xs={24} sm={24} lg={24}>
                            <ChangePicture uploadProps={uploadProps}/>
                        </Col>
                        <Col span={24} xs={24} sm={24} lg={24}>
                            <Form.Item
                                label="Category Name"
                                name="name"
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
        </React.Fragment>
  )
}
CategoryForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  btnText: PropTypes.string,
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  btnIcon: PropTypes.node.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (data) => dispatch(addCategory(data)),
    editCategory: (data) => dispatch(editCategory(data))
  }
}
export default connect(null, mapDispatchToProps)(CategoryForm)
