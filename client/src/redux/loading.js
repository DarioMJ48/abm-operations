import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = false

const loadingSlice = createSlice({
    name: 'loading',
    initialState: { value: initialStateValue },
    reducers: {
        setLoading: (state) => { state.value = !state.value }
    }
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer