import React from 'react'
import PropTypes from 'prop-types'
const ImgComponent = (props) => {
  const { alt, path } = props
  return (
        <img
            style={{ height: '188px', width: '100%' }}
            alt={alt} src={path}
        />
  )
}

ImgComponent.propTypes = {
  alt: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}
export default ImgComponent
