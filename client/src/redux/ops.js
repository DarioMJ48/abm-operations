import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = []

const opsSlice = createSlice({
    name: 'ops',
    initialState: { value: initialStateValue },
    reducers: {
        setOps: (state, action) => { state.value = action.payload }
    }
})

export const { setOps } = opsSlice.actions

export default opsSlice.reducer