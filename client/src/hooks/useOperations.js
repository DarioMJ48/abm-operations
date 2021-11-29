import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const useOperations = () => {
    const { opsI, opsO, setOpsListUpdated, setOpToEdit, loading } = useContext(AllContext)
    const history = useHistory()

    const handleUpdate = (op, opType) => {
        op.type = opType
        setOpToEdit(op)
        history.push('/edit')
    }

    const handleDelete = (id, opType) => {
        axios.delete(`http://localhost:3010/${opType}s/delete/` + id)
        setOpsListUpdated(true)
    }

    return [opsI, opsO, handleUpdate, handleDelete, loading]
}

export default useOperations
