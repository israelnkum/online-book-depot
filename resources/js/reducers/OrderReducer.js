import { Types } from '../actions/orders/Types'
const initialState = {
  orders: [],
  orderDetail: {}
}

export default function ordersReducer (state = initialState, action) {
  switch (action.type) {
    case Types.ALL_ORDERS:
      return { ...state, orders: action.payload }

    case Types.ORDER_DETAIL:
      return { ...state, orderDetail: action.payload }

    default:
      return state
  }
}
