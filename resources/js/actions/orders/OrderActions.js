import { Types } from './Types'
import api from '../../utils/api'

export function getAllOrders (payload) {
  return {
    type: Types.ALL_ORDERS, payload: payload
  }
}

export function getMyOrders (payload) {
  return {
    type: Types.MY_ORDERS, payload: payload
  }
}
export function getOrderDetail (payload) {
  return {
    type: Types.ORDER_DETAIL, payload: payload
  }
}

export const handleGetAllOrders = (type = null) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(type).then((res) => {
      dispatch(getAllOrders(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
export const handleGetOrderDetail = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`/orders/${id}`).then((res) => {
      dispatch(getOrderDetail(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
