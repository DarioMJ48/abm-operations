import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const ACTIONS = {
  CHANGE: 'CHANGE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

const useOperationsReducer = (state, action) => {
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
        .catch((err) => console.log(`ERROR! (${err.response.status} ${err.response.statusText})`))
        .then((res) => console.log(`Operation deleted! (${res.status} ${res.statusText})`))
      break;          
    default:
        throw new Error()
    }
}

export default useOperationsReducer
