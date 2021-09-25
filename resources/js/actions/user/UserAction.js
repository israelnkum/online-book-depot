import { Types } from './Types'
import api from '../../utils/api'

export const getUserDetail = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get('/customer/details').then((res) => {
      dispatch({
        type: Types.GET_DETAIL,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const updateUser = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/customer/${values.id}`, values).then((res) => {
      dispatch({
        type: Types.GET_DETAIL,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const addAddressBook = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/customer/address', values).then((res) => {
      dispatch({
        type: Types.NEW_ADDRESS,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
export const getAllAddress = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get('/customer/address').then((res) => {
      dispatch({
        type: Types.ALL_ADDRESSES,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const editAddress = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/customer/address/${values.id}`, values).then((res) => {
      dispatch({
        type: Types.EDIT_ADDRESS,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
export const getAuthUser = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get('/auth/me').then((res) => {
      dispatch({
        type: Types.GET_AUTH_USER,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const handleChangePassword = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/user/change-password', data).then((res) => {
      dispatch(getAuthUser(res.data))
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
