import React from 'react'
import AllShopsContainer from '../../containers/shop/AllShopsContainer'
import { PlusOutlined } from '@ant-design/icons'
import { ShopForm } from './shop-form'
import AppPageHeader from '../commons/app-page-header'
function Shop () {
  return (
        <>
            <AppPageHeader title={'Shops'} extras={[
                <ShopForm key={'new-shop'} formValues={{ id: '0' }} btnIcon={<PlusOutlined style={{ cursor: 'pointer' }}/>} btnText={'New Shop'}/>
            ]}/>
            <AllShopsContainer/>
        </>
  )
}
export default Shop
