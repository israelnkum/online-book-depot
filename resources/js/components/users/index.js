import React from 'react'
import AppPageHeader from '../commons/app-page-header'
import AllUsers from './all-users'
import { PlusOutlined } from '@ant-design/icons'
import UserForm from './user-form'
function Users () {
  return (
        <>
            <AppPageHeader title={'Users'} extras={[
                <UserForm key={'new-admin'} formValues={{ id: 0 }} btnIcon={<PlusOutlined/>} btnText={'New Admin'}/>
            ]}/>
            <AllUsers/>
        </>
  )
}
export default Users
