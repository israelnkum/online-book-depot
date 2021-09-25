import React from 'react'
import AllStations from './all-stations'
import PickupForm from './pickup-form'
import AppPageHeader from '../commons/app-page-header'
function PickupStation () {
  return (
        <>
            <AppPageHeader title={'Pickup Stations'} extras={[
                <PickupForm key={'new-station'} btnText={'Add Station'}/>
            ]}/>
            <AllStations/>
        </>
  )
}
export default PickupStation
