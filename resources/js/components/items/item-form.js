import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Button, Form, Input, Row, Col, Space, message, Select, Drawer, InputNumber, Avatar } from 'antd'
import { connect } from 'react-redux'
import { addItem, editItem } from '../../actions/items/ItemAction'
import ChangePicture from './change-picture'

function ItemForm (props) {
  const { addItem, editItem } = props
  const [selectedFile, setSelectedFile] = useState(null)
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
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
  const onFinish = (values) => {
    const formData = new FormData()
    formData.append('file', selectedFile)
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) { formData.append(key, values[key]) }
    }

    (values.id === '0' ? addItem(formData) : editItem(values)).then(() => {
      setVisible(false)
      message.success('Item ' + (values.id === '0' ? 'Added' : 'Updated'))
      form.resetFields()
    }).catch((error) => {
      console.log(error)
      message.warning(error.response)
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
        <React.Fragment>
            <Button size={'small'} onClick={showDrawer} icon={props.btnIcon}>
                {props.btnText}
            </Button>
            <Drawer
                title="Item"
                placement="right"
                closable
                width={950}
                onClose={onClose}
                visible={visible}
            >
                <Form
                    layout={'vertical'}
                    name="add-address-from"
                    form={form}
                    initialValues={props.formValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row justify={'center'}>
                        {
                            props.formValues.id !== '0'
                              ? <Col span={4} xs={24} sm={24} md={4} lg={4}>
                                    <Avatar size={100} shape={'square'} src={'/storage/images/items/' + props.formValues.file}/>
                                </Col>
                              : <Col span={4} xs={24} sm={24} md={4} lg={4}>
                                    <ChangePicture uploadProps={uploadProps}/>
                                </Col>

                        }
                    </Row>
                    <Row gutter={[5, 5]}>
                        <Col span={8} xs={8} sm={8} lg={8}>
                            <Form.Item name="brandId" label={'Brand'} rules={[{ required: true, message: 'Required' }]}>
                                <Select placeholder="Select Brand" allowClear>
                                    {
                                        props.brands.map((brand) => {
                                          return <Select.Option key={brand.id} value={brand.id}>{brand.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} xs={8} sm={8} lg={8}>
                            <Form.Item name="shopId" label={'Shop'} rules={[{ required: true, message: 'Required' }]}>
                                <Select placeholder="Select Shop" allowClear>
                                    {
                                        props.shops.map((shop) => {
                                          return <Select.Option key={shop.id} value={shop.id}>{shop.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} xs={8} sm={8} lg={8}>
                            <Form.Item name="categoryId" label={'Category'} rules={[{ required: true, message: 'Required' }]}>
                                <Select placeholder="Select Category" allowClear>
                                    {
                                        props.categories.map((category) => {
                                          return <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={24} lg={24}>
                            <Form.Item
                                label="Item Name"
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
                        <Col span={6} xs={6} sm={6} lg={6}>
                            <Form.Item
                                label="Receiving Qty"
                                name="qtyInStock"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Required'
                                  }
                                ]}
                            >
                                <InputNumber className={'inputNumber'}/>
                            </Form.Item>
                        </Col>
                        <Col span={6} xs={6} sm={6} lg={6}>
                            <Form.Item
                                label="Cost Price"
                                name="costPrice"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Required'
                                  }
                                ]}
                            >
                                <InputNumber className={'inputNumber'}/>
                            </Form.Item>
                        </Col>
                        <Col span={6} xs={6} sm={6} lg={6}>
                            <Form.Item
                                label="Selling Price"
                                name="sellingPrice"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Required'
                                  }
                                ]}
                            >
                                <InputNumber className={'inputNumber'}/>
                            </Form.Item>
                        </Col>
                        <Col span={6} xs={6} sm={6} lg={6}>
                            <Form.Item
                                label="Promo Price"
                                name="discountedPrice"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Required'
                                  }
                                ]}
                            >
                                <InputNumber className={'inputNumber'}/>
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={24} lg={24}>
                            <Form.Item
                                label="Tags"
                                name="tags"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Required'
                                  }
                                ]}
                            >
                                <Select mode="multiple" style={{ width: '100%' }} placeholder="Tags Mode">
                                    {
                                        props.tags.map((tag) => {
                                          return <Select.Option key={tag.id} value={tag.id}>{tag.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Form.Item
                                hidden
                                label="ID"
                                name="id"
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
                            <Form.Item label="Description" name="description"
                                       getValueFromEvent={(event, editor) => {
                                         return editor.getData()
                                       }}>
                                <CKEditor data={props.formValues.description} editor={ClassicEditor} />
                            </Form.Item>
                            {/* <Form.Item
                                name={'description'}
                                label="Description"
                            >
                                <Input.TextArea />
                            </Form.Item> */}
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Space>
                                <Button type="default" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </React.Fragment>
  )
}

ItemForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  btnIcon: PropTypes.node.isRequired,
  btnText: PropTypes.string
}

ItemForm.defaultProps = {
  formValues: {
    id: '0',
    sellingPrice: 0,
    qtyInStock: 0,
    discountedPrice: 0,
    costPrice: 0,
    showIfCompleted: 0,
    description: null
  }
}
const mapStateToProps = (state) => {
  return {
    brands: state.brandReducer.brands,
    shops: state.shopReducer.shops,
    categories: state.categoryReducer.categories,
    tags: state.itemReducer.tags
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (data) => dispatch(addItem(data)),
    editItem: (data) => dispatch(editItem(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm)
