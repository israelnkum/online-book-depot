import { Types } from './Types'

export function addNewPickupStation (payload) {
  return {
    type: Types.NEW_PICKUP_STATION,
    payload
  }
}

export function getAllPickupStations (payload) {
  return {
    type: Types.ALL_PICKUP_STATIONS,
    payload
  }
}

export function deletePickupStation (id) {
  return {
    type: Types.DELETE_PICKUP_STATION,
    id
  }
}

export function updatePickupStation (payload) {
  return {
    type: Types.UPDATE_PICKUP_STATION,
    payload
  }
}

export function getCustomerPickupLocation (payload) {
  return {
    type: Types.GET_CUSTOMER_PICKUP_LOCATION,
    payload
  }
}
