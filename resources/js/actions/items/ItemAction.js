import { Types } from './Types'
import api from '../../utils/api'

export const addItem = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/items`, values).then((res) => {
            dispatch({
                type: Types.NEW_ITEM,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const getAllItems = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/items`).then((res) => {
            dispatch({
                type: Types.ALL_ITEMS,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const getAllTags = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/tags`).then((res) => {
            dispatch({
                type: Types.ALL_TAGS,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const editItem = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().put(`/items/${values.get(id)}`, values).then((res) => {
            // dispatch({
            //     type: Types.UPDATE_ITEM,
            //     payload: res.data
            // })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const deleteItem = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/items/${id}`).then((res) => {
            dispatch({
                type: Types.DELETE_ITEM,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
