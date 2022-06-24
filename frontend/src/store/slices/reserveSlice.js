import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reserveData: null,
}

export const reserveSlice = createSlice({
    name: 'reserve',
    initialState,
    reducers: {
        setReserve: (state, action) => {
            state.reserveData = action.payload.reserveData
        },
    },
})

// Action creators are generated for each case reducer function
export const { setReserve } = reserveSlice.actions

export default reserveSlice.reducer