import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types'
import {getUserDetail} from "../../../actions/user/UserAction";
import { Col, Row} from "antd";
import AddressBook from "./address-book";
import AccountDetails from "./account-details";

export default function AccountOverview(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        dispatch(getUserDetail()).then((res) => {
            setLoading(false)
        })
    }, [])
    return (
        <Row gutter={[5, 5]}>
            <Col span={12}  xs={24} sm={24} lg={12}>
                <AccountDetails loading={loading} userDetail={props.userDetail}/>
            </Col>
            <Col span={12}  xs={24} sm={24} lg={12}>
               <AddressBook userDetail={props.userDetail}/>
            </Col>
        </Row>
    );
}
AccountOverview.propTypes = {
    userDetail: PropTypes.object.isRequired
}

