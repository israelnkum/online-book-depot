import { Types } from '../actions/categories/Types'
const initialState = {
    categoryDetail: {},
    itemDetail: {},
    categoryItems: [],
    categories: []
}

export default function categoryReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_CATEGORY:
            return { ...state, categoryDetail: action.payload }

       case Types.LANDING_ITEMS:
            return { ...state, categoryItems: action.payload }

        case Types.NEW_CATEGORY:
            return {
                ...state,
                categories: state.categories.concat(action.payload)
            }
        case Types.ITEM_DETAIL:
            return { ...state, itemDetail: action.payload }

        case Types.ALL_CATEGORIES:
            return {
                ...state, categories: action.payload
            }
        case Types.UPDATE_CATEGORY:
            return {
                ...state,
                categories: state.categories.map((category) => {
                    return category.id === action.payload.id ? action.payload : category
                })
            }
        case Types.DELETE_CATEGORY:
            return { ...state, categories: state.categories.filter((category) => category.id !== action.payload.id) }

        default:
            return state
    }
}
