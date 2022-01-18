import { configureStore } from '@reduxjs/toolkit'
import opsReducer from './ops'
import opToEditReducer from './opToEdit'
import opsValuesReducer from './opsValues'
import opsListUpdatedReducer from './opsListUpdated'


export default configureStore({
  reducer: {
    ops: opsReducer,
    opToEdit: opToEditReducer,
    opsValues: opsValuesReducer,
    opsListUpdated: opsListUpdatedReducer
  }
})
