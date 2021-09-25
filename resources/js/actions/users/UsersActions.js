import { Types } from './Types'
import api from '../../utils/api'

export function getAllUsers (payload) {
  return {
    type: Types.ALL_USERS, payload: payload
  }
}

export function addNewUser (payload) {
  return {
    type: Types.NEW_USER, payload: payload
  }
}

export function getUserDetail (payload) {
  return {
    type: Types.USER_DETAIL, payload: payload
  }
}
export function deleteUser (payload) {
  return {
    type: Types.DELETE_USER, payload: payload
  }
}
export function updateUserInfo (payload) {
  return {
    type: Types.UPDATE_USER_INFO, payload: payload
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

export const handleAddNewUser = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/users', data).then((res) => {
      dispatch(addNewUser(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
export const handleDeleteUser = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().delete(`/users/${id}`).then((res) => {
      dispatch(deleteUser(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
export const handleUpdateUser = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/users/${values.id}`, values).then((res) => {
      dispatch({
        type: Types.UPDATE_USER_INFO,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
