import { Types } from '../actions/items/Types'
const initialState = {
  itemDetail: {},
  items: [],
  tags: [],
  tagItems: []
}

export default function itemReducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_DETAIL:
      return { ...state, itemDetail: action.payload }

    case Types.NEW_ITEM:
      return {
        ...state,
        items: state.items.concat(action.payload)
      }

    case Types.ALL_ITEMS:
      return {
        ...state, items: action.payload
      }

    case Types.ITEMS_BASED_ON_TAGS:
      return {
        ...state, tagItems: action.payload
      }

    case Types.ALL_TAGS:
      return {
        ...state, tags: action.payload
      }

    case Types.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          return item.id === action.payload.id ? action.payload : item
        })
      }
    case Types.DELETE_ITEM:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) }

    default:
      return state
  }
}
