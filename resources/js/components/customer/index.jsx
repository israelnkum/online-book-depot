import React from 'react'
import AccountOverviewContainer from '../../containers/user/AccountOverviewContainer'
import AppPageHeader from '../commons/app-page-header'

export default function User () {
  return (
        <>
            <AppPageHeader title={'Account Overview'}/>
            <AccountOverviewContainer/>
        </>
  )
}
