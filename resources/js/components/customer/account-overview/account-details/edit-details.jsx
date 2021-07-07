import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {Modal, Button, Form, Input, Row, Col, Space, message,} from 'antd';
import {EditOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {updateUser} from "../../../../actions/user/UserAction";

export const EditDetails = (props) => {
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
        dispatch(updateUser(values)).then(() => {
            message.success('Info Updated')
            form.resetFields()
            handleOk(false)
        }).catch((error) => {
            message.warning('error.response.data')
        })
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <EditOutlined onClick={showModal} style={{ cursor: 'pointer' }}/>
            <Modal title="Account Details"
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <Form
                    layout={'vertical'}
                    name="edit-detail-from"
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
                                        message: 'Required',
                                    },
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
                                name="phoneNumber"
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
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                hidden
                                label="ID"
                                name="id"
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


EditDetails.propTypes = {
    formValues : PropTypes.object.isRequired
}
