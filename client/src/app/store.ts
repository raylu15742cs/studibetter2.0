import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../components/user'

export default configureStore({
    reducer: {
        user: userReducer
    }
})