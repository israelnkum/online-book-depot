import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {Modal, Button, Form, Input, Row, Col, Space, message, Select,} from 'antd';
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {addAddressBook, editAddress} from "../../actions/user/UserAction";
import {addShop, editShop} from "../../actions/shop/ShopAction";

export const TagForm = (props) => {
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm()
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        dispatch(values.id === '0' ? addShop(values) : editShop(values)).then((res) => {
            message.success('Shop ' + (values.id === '0' ? 'Added' : 'Updated'))
            form.resetFields()
            handleOk(false)
        }).catch((error) => {
            message.warning(error.response.data)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Button size={'small'} onClick={showModal} icon={props.btnIcon}>
                {props.btnText}
            </Button>
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
                        <Col span={24} xs={24} sm={24} lg={24}>
                            <Form.Item
                                label="Shop Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Form.Item
                                label="Phone Number"
                                name="contactNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Form.Item
                                label="Other Phone Number"
                                name="contactNumberAlt"
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
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Not a valid mail'
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} lg={12}>
                            <Form.Item
                                name={'location'}
                                label="Location"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} sm={24} lg={24}>
                            <Form.Item
                                name={'address'}
                                label="Address"
                            >
                                <Input.TextArea />
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
    );
}


TagForm.propTypes = {
    formValues : PropTypes.object.isRequired,
    btnIcon : PropTypes.node.isRequired,
    btnText : PropTypes.string,
}
