import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

const PopUp = (props) => {
  const { showModal, setShowModal, children, title } = props

  return (
        <Modal title={title} centered visible={showModal} footer={null} onCancel={() => setShowModal()} width={1000}>
            {children}
        </Modal>

  )
}
PopUp.propTypes = {
  showModal: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.any,
  setShowModal: PropTypes.any.isRequired
}
export default PopUp
