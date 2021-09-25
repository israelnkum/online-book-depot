import React from 'react'
import AppPageHeader from '../commons/app-page-header'
import AllOrders from './all-users'
function Users () {
  return (
        <>
            <AppPageHeader title={'Users'} />
            <AllOrders/>
        </>
  )
}
export default Users
