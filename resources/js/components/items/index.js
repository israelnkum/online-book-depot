import React from 'react'
import AllItems from './all-items'
import AppPageHeader from '../commons/app-page-header'
import ItemForm from './item-form'
import { PlusOutlined } from '@ant-design/icons'
function Items () {
  return (
      <>
          <AppPageHeader title={'All Items'} extras={[
              <ItemForm key={'new-item'} btnIcon={<PlusOutlined style={{ cursor: 'pointer' }}/>} btnText={'New Item'}/>
          ]}/>
          <AllItems/>
      </>
  )
}
export default Items
