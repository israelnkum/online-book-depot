import React from 'react'
import PropTypes from 'prop-types'
import DefaultImage from '../../default.png'
const ImgComponent = (props) => {
  const { alt, path } = props
  return (
        <>
            {
                path === 'default.png'
                  ? <img style={{ height: '188px', width: '100%' }} alt={alt} src={DefaultImage}/>
                  : <img
                        style={{ height: '188px', width: '100%' }}
                        alt={alt} src={path}
                    />
            }

        </>
  )
}

ImgComponent.propTypes = {
  alt: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}
export default ImgComponent
