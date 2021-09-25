import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { handleGetAllUsers } from '../../actions/users/UsersActions'
const { Column } = Table
function AllUsers (props) {
  const location = useLocation()
  const { users, getAllUsers } = props
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAllUsers(location.pathname).then((res) => {
      setLoading(false)
    })
  }, [location.pathname])

  return (
      <Table style={{ zIndex: -1 }} loading={loading} dataSource={users} scroll={{ x: 50 }} rowKey={'id'}>
          <Column title="Surname" dataIndex={'surName'}/>
          <Column title="Other Names" dataIndex="otherNames"/>
          <Column title="Email" dataIndex="email"/>
          <Column title="Phone Number" dataIndex="phoneNumber"/>
      </Table>
  )
}

AllUsers.propTypes = {
  users: PropTypes.array.isRequired,
  getAllUsers: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: (type) => dispatch(handleGetAllUsers(type))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
