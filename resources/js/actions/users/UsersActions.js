import { Types } from './Types'
import api from '../../utils/api'

export function getAllUsers (payload) {
  return {
    type: Types.ALL_USERS, payload: payload
  }
}

export function getUserDetail (payload) {
  return {
    type: Types.USER_DETAIL, payload: payload
  }
}

export const handleGetAllUsers = (type = null) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(type).then((res) => {
      dispatch(getAllUsers(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
export const handleGetUserDetail = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`/users/${id}`).then((res) => {
      dispatch(getUserDetail(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
