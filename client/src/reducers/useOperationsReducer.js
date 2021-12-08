import { useContext } from 'react'
import { AllContext } from '../contexts/AllContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const ACTIONS = {
  CHANGE: 'CHANGE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

const useOperationsReducer = (state, action) => {
  const { setOpsListUpdated } = useContext(AllContext)
  const history = useHistory()

  switch (action.type) {
    case ACTIONS.CHANGE:
      console.log('CHANGING...')
      break;
    case ACTIONS.UPDATE:
      history.push('/edit')
      break;
    case ACTIONS.DELETE:
      axios.delete(`http://localhost:3010/operations/delete/${action.payload.id}`)
        .then((res) => console.log(`Operation deleted! (${res.status} ${res.statusText})`))
        .catch((err) => console.log(err))
        
        setTimeout(function () {
          setOpsListUpdated(true)
      }, 1000)
      break;
    default:
        throw new Error()
    }
}

export default useOperationsReducer
