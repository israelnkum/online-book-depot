import { Types } from '../actions/users/Types'
const initialState = {
  users: []
}
export default function usersReducer (state = initialState, action) {
  switch (action.type) {
    case Types.ALL_USERS:
      return { ...state, users: action.payload }
    case Types.NEW_USER:
      return {
        ...state,
        users: state.users.concat(action.payload)
      }

    case Types.UPDATE_USER_INFO:
      return {
        ...state,
        users: state.users.map((user) => {
          return user.id === action.payload.id ? action.payload : user
        })
      }
    case Types.DELETE_USER:
      return { ...state, users: state.users.filter((user) => user.id !== action.payload.id) }

    default:
      return state
  }
}
