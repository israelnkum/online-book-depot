import { Types } from '../actions/user/Types'
const initialState = {
  userDetail: {},
  addressBook: []
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_DETAIL:
      return { ...state, userDetail: action.payload }

    case Types.NEW_ADDRESS:
      return {
          ...state,
          addressBook: state.addressBook.concat(action.payload)
      }

    case Types.ALL_ADDRESSES:
      return {
          ...state, addressBook: action.payload
      }
      case Types.EDIT_ADDRESS:
          return {
              ...state,
              addressBook: state.addressBook.map((address) => {
                  return address.id === action.payload.id ? action.payload : address
              })
          }
    default:
      return state
  }
}
