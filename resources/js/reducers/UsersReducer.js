import { Types } from '../actions/users/Types'
const initialState = {
  users: []
}
export default function usersReducer (state = initialState, action) {
  switch (action.type) {
    case Types.ALL_USERS:
      return { ...state, users: action.payload }

    default:
      return state
  }
}
