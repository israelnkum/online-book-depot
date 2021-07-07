import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types'
import {getUserDetail} from "../../../../actions/user/UserAction";
import {Card, Col, Row} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {AddressForm} from "./address-form";
import AllAddressesContainer from "../../../../containers/user/AllAddressesContainer";

export default function AddressBook(props) {
    return (
        <Card
            title={'Address Book'}
            size={'small'}
            extra={
                <AddressForm btnIcon={<PlusOutlined  style={{ cursor: 'pointer' }}/>} formValues={{ id: '0', userId: props.userDetail.id}}/>
            }
        >
            <AllAddressesContainer/>
        </Card>
    );
}
AddressBook.propTypes = {
    userDetail: PropTypes.object.isRequired
}

