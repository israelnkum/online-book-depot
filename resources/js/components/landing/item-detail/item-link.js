import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
export default function ItemLink(props) {
    return (
        <Link to={`/landing/category/${props.categoryName}/${props.itemName}/detail/${props.itemId}`}>
            {props.children}
        </Link>
    )
}

ItemLink.propTypes = {
    categoryName: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}
