import { Types } from '../actions/shop/Types'
const initialState = {
  userDetail: {},
  shops: []
}

export default function shopReducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_DETAIL:
      return { ...state, userDetail: action.payload }

    case Types.NEW_SHOP:
      return {
        ...state,
        shops: state.shops.concat(action.payload)
      }
    case Types.ALL_SHOPS:
      return {
        ...state, shops: action.payload
      }
    case Types.UPDATE_SHOP:
      return {
        ...state,
        shops: state.shops.map((shop) => {
          return shop.id === action.payload.id ? action.payload : shop
        })
      }
    case Types.DELETE_SHOP:
      return { ...state, shops: state.shops.filter((shop) => shop.id !== action.payload.id) }

    default:
      return state
  }
}
