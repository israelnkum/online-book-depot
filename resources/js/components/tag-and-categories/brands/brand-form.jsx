import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {Modal, Button, Form, Input, Row, Col, Space, message, Select,} from 'antd';
import {useDispatch} from "react-redux";
import {addBrand, editBrand} from "../../../actions/brands/BrandAction";

export const BrandForm = (props) => {
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
        dispatch(values.id === '0' ? addBrand(values) : editBrand(values)).then((res) => {
            message.success('Brand ' + (values.id === '0' ? 'Created' :'Updated'))
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
            <Modal title="Edit Category"
                   width={290}
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
                    <Row>
                        <Col span={24} xs={24} sm={24} lg={24}>
                            <Form.Item
                                label="Brand Name"
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
                        <Col span={24} xs={24} sm={24} lg={24}>
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
    );
}
BrandForm.propTypes = {
    formValues : PropTypes.object.isRequired,
    btnText : PropTypes.string,
    icon : PropTypes.node
}
