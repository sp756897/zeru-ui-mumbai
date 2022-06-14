import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: null
}

export const counterSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload.address
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAddress } = counterSlice.actions

export default counterSlice.reducer