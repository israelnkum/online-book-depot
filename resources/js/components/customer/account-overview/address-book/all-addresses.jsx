import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import {Modal, Button, Form, Input, Row, Col, Space, message, Select, List,} from 'antd';
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {addAddressBook, getAllAddress, updateUser} from "../../../../actions/user/UserAction";
import {AddressForm} from "./address-form";

export const AllAddresses = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllAddress()).then((res) => {

        })
    }, [])
    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={props.addressBook}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.name}
                            description={
                                <>
                                    {item.address} <br/>
                                    {item.city + ',' +item.region} <br/>
                                    {item.phoneNumber + '/' +item.phoneNumberAlt}
                                </>
                            }
                        />
                        <AddressForm
                            btnIcon={<EditOutlined  style={{ cursor: 'pointer' }}/>}
                            formValues={item}/>
                    </List.Item>
                )}
            />
        </>
    );
}


AllAddresses.propTypes = {
    addressBook : PropTypes.array.isRequired
}
