import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        sub: ''
    },
    reducers: {
        newuser: (state, action) => {
            state.name = action.payload
        },
        resetuser: state => {
            state.name = ""
            state.sub = ''
        },
        newsub: (state,action) => {
            state.sub = action.payload
        }
     }
})


export const { newuser, resetuser , newsub} = userSlice.actions
export default userSlice.reducer
export const username = (state: { user: { name: string } }) => state.user.name
export const usersub = (state: { user: {sub: string} }) => state.user.sub