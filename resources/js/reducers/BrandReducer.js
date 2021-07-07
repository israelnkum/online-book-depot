import { Types } from '../actions/brands/Types'
const initialState = {
    brandDetail: {},
    brands: []
}

export default function brandReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_BRAND:
            return { ...state, brandDetail: action.payload }

        case Types.NEW_BRAND:
            return {
                ...state,
                brands: state.brands.concat(action.payload)
            }

        case Types.ALL_BRANDS:
            return {
                ...state, brands: action.payload
            }
        case Types.UPDATE_BRAND:
            return {
                ...state,
                brands: state.brands.map((brand) => {
                    return brand.id === action.payload.id ? action.payload : brand
                })
            }
        case Types.DELETE_BRAND:
            return { ...state, brands: state.brands.filter((brand) => brand.id !== action.payload.id) }

        default:
            return state
    }
}
