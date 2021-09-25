import { Types } from './Types'

export function addItemToCart (payload) {
  return {
    type: Types.ADD_TO_CART, payload: payload
  }
}

export function updateCart (payload) {
  return {
    type: Types.UPDATE_CART, payload: payload
  }
}

export function removeCart (itemId) {
  return {
    type: Types.REMOVE_FROM_CART, itemId
  }
}

export const handleUpdateCart = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(updateCart(payload))
    resolve()
  })
}

export const handleAddItemToCart = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(addItemToCart(payload))
    resolve()
  })
}

export const handleRemoveFromCart = (itemId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(removeCart(itemId))
    resolve()
  })
}
