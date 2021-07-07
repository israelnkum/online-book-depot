import { Types } from './Types'
import api from '../../utils/api'

export const addBrand = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/brands`, values).then((res) => {
            dispatch({
                type: Types.NEW_BRAND,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const getAllBrands = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/brands`).then((res) => {
            dispatch({
                type: Types.ALL_BRANDS,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const editBrand = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().put(`/brands/${values.id}`, values).then((res) => {
            dispatch({
                type: Types.UPDATE_BRAND,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const deleteBrand = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/brands/${id}`).then((res) => {
            dispatch({
                type: Types.DELETE_BRAND,
                payload: res.data
            })
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
