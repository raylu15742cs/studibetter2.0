import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '../components/user'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)


export default configureStore({
    reducer: persistedReducer
})