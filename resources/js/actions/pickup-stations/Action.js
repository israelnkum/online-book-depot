import api from '../../utils/api'
import {
  addNewPickupStation,
  deletePickupStation,
  getAllPickupStations,
  getCustomerPickupLocation,
  updatePickupStation
} from './ActionCreator'

export const handleAddNewPickupStation = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/pickup-stations', values).then((res) => {
      dispatch(addNewPickupStation(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const handleGetAllPickupStations = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get('/pickup-stations').then((res) => {
      dispatch(getAllPickupStations(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const handleUpdatePickupStation = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/pickup-stations/${values.id}`, values).then((res) => {
      dispatch(updatePickupStation(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const handleDeletePickupStation = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().delete(`/pickup-stations/${id}`).then((res) => {
      dispatch(deletePickupStation(id))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const handleGetCustomerPickupLocation = (locationId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`/pickup-station/me/${locationId}`).then((res) => {
      dispatch(getCustomerPickupLocation(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
