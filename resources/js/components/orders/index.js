import React from 'react'
import AppPageHeader from '../commons/app-page-header'
import AllOrders from './all-orders'
function Orders () {
  return (
        <>
            <AppPageHeader title={'Orders'} />
            <AllOrders/>
        </>
  )
}
export default Orders
