import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function CategoryLink (props) {
  return (
        <Link to={`/landing/category/${props.name}/${props.id}`}>
            {props.children}
        </Link>
  )
}

CategoryLink.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
