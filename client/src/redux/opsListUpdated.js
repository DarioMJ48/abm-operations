import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = false

const opsListUpdatedSlice = createSlice({
    name: 'opsListUpdated',
    initialState: { value: initialStateValue },
    reducers: {
        setOpsListUpdated: (state, action) => { state.value = !state.value }
    }
})

export const { setOpsListUpdated } = opsListUpdatedSlice.actions

export default opsListUpdatedSlice.reducer