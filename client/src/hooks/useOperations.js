import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import { useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const ACTIONS = {
    HANDLE_UPDATE: 'handle_update',
    HANDLE_DELETE: 'handle_delete'
}

function reducer(ops, action) {
    switch (action.type) {
        case ACTIONS.HANDLE_UPDATE:
            console.log('REDUCER - Update logic waiting...')
            break
        case ACTIONS.HANDLE_DELETE:
            console.log('REDUCER - Delete logic waiting...')
            break
        default:
            console.log('REDUCER - Default (?)')
    }
}

const useOperations = () => {
    const { opsI, opsO, setOpsListUpdated, setOpToEdit, loading } = useContext(AllContext)

    const [ops, dispatch] = useReducer(reducer, [])

    const history = useHistory()

    const handleUpdate = (op, opType) => {
        op.type = opType
        setOpToEdit(op)
        history.push('/edit')
        dispatch({ type: ACTIONS.HANDLE_UPDATE })
    }

    const handleDelete = (id, opType) => {
        axios.delete(`http://localhost:3010/${opType}s/delete/` + id)
            .then(res => console.log(`Operation deleted! (${res.status} ${res.statusText})`))
            .catch(err => console.log(`ERROR! (${err.response.status} ${err.response.statusText})`))

        dispatch({ type: ACTIONS.HANDLE_DELETE })
        setOpsListUpdated(true)
    }

    return [opsI, opsO, handleUpdate, handleDelete, loading]
}

export default useOperations
