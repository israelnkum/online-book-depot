import React, {useState} from 'react';
import Proptypes from 'prop-types'
import { Breadcrumb } from 'antd'
import {Link} from "react-router-dom";
export default function CategoryBreadcrumb(props) {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to={'/'}>Home</Link>
            </Breadcrumb.Item>
            {props.children}
        </Breadcrumb>
    )
}

CategoryBreadcrumb.propTypes = {
    children: Proptypes.node,
}
