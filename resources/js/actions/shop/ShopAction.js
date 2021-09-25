import { Types } from './Types'
import api from '../../utils/api'

export const addShop = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/shops', values).then((res) => {
      dispatch({
        type: Types.NEW_SHOP,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getAllShops = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get('/shops').then((res) => {
      dispatch({
        type: Types.ALL_SHOPS,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const editShop = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/shops/${values.id}`, values).then((res) => {
      dispatch({
        type: Types.UPDATE_SHOP,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const deleteShop = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().delete(`/shops/${id}`).then((res) => {
      dispatch({
        type: Types.DELETE_SHOP,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
