import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import userReducer from './UserReducer'
import shopReducer from './ShopReducer'
import categoryReducer from './CategoryReducer'
import itemReducer from './ItemReducer'
import brandReducer from "./BrandReducer";


const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'userReducer',
        'shopReducer',
        'categoryReducer',
        'itemReducer',
        'brandReducer',
    ]
}

const rootReducer = combineReducers({
    userReducer,
    shopReducer,
    categoryReducer,
    itemReducer,
    brandReducer,
})

export default persistReducer(persistConfig, rootReducer)
