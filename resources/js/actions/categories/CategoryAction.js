import { Types } from './Types'
import api from '../../utils/api'

export const addCategory = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/categories`, values).then((res) => {
            dispatch({
                type: Types.NEW_CATEGORY,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const getAllCategories = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/categories`).then((res) => {
            dispatch({
                type: Types.ALL_CATEGORIES,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const getLandingCategories = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/landing/categories`).then((res) => {
            dispatch({
                type: Types.ALL_CATEGORIES,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const getCategoryItems = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/landing/category/items/${id}`).then((res) => {
            dispatch({
                type: Types.LANDING_ITEMS,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const getItemDetail = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/landing/category/item/${id}/detail`).then((res) => {
            dispatch({
                type: Types.ITEM_DETAIL,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const editCategory = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().put(`/categories/${values.id}`, values).then((res) => {
            dispatch({
                type: Types.UPDATE_CATEGORY,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const deleteCategory = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/categories/${id}`).then((res) => {
            dispatch({
                type: Types.DELETE_CATEGORY,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
