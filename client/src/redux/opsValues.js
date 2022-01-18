import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = { type: 'All', category: 'All' }

const opsValuesSlice = createSlice({
    name: 'opsValues',
    initialState: { value: initialStateValue },
    reducers: {
        setOpsValues: (state, action) => { state.value = action.payload }
    }
})

export const { setOpsValues } = opsValuesSlice.actions

export default opsValuesSlice.reducer