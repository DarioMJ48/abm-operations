import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = ''

const opToEditSlice = createSlice({
    name: 'opToEdit',
    initialState: { value: initialStateValue },
    reducers: {
        setOpToEdit: (state, action) => { state.value = action.payload }
    }
})

export const { setOpToEdit } = opToEditSlice.actions

export default opToEditSlice.reducer
