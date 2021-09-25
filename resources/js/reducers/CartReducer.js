import { Types } from '../actions/cart/Types'
const initialState = {
  cartItems: []
}

export default function cartReducer (state = initialState, action) {
  switch (action.type) {
    case Types.ADD_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload)
      }

    case 'CLEAR_CART':
      return { ...state, cartItems: [] }

    case Types.UPDATE_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((itm) => {
          return itm.item.id === action.payload.itemId
            ? { ...itm, qty: itm.qty + action.payload.qty }
            : itm
        }).filter((item) => item.qty !== 0)
      }

    case Types.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(itm => itm.item.id !== action.itemId)
      }

    default:
      return state
  }
}
