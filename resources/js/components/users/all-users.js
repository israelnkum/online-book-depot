import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { handleDeleteUser, handleGetAllUsers } from '../../actions/users/UsersActions'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import UserForm from './user-form'
const { Column } = Table
function AllUsers (props) {
  const location = useLocation()
  const { users, handleDelete, getAllUsers } = props
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
          <Column
              title="Action"
              render={(text, record) => (
                  <Space>
                      <UserForm formValues={record} btnIcon={<EditOutlined/>}/>
                      <Popconfirm title="Sure to delete?" onConfirm={() => {
                        handleDelete(record.id)
                        message.success('Account Deleted')
                      }} cancelText={'No'} okText={'Yes'}>
                          <Button size={'small'} danger icon={<DeleteOutlined/>}/>
                      </Popconfirm>
                  </Space>
              )}
          />
      </Table>
  )
}

AllUsers.propTypes = {
  users: PropTypes.array.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: (type) => dispatch(handleGetAllUsers(type)),
  handleDelete: (id) => dispatch(handleDeleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
