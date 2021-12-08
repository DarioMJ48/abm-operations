import { useState, useEffect } from 'react'
import axios from 'axios'
import { AllContext } from './contexts/AllContext'
import useLocalStorage from './hooks/useLocalStorage'

import AppRouter from './routes/AppRouter'

function App() {
  const [ops, setOps] = useState([])
  const [opToEdit, setOpToEdit] = useState()
  const [opsValues, setOpsValues] = useState({ type: 'All', category: 'All' })
  const [opsListUpdated, setOpsListUpdated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useLocalStorage('username', '')
  const [userId, setUserId] = useLocalStorage('id', '')
  
  useEffect(() => {
    axios.get(`http://localhost:3010/users/id/${userId}`)
      .then((res) => setOps(res.data.Operations.reverse()))
      .catch(error => console.error(error))
      
    setOpsListUpdated(false)
    setLoading(false)
  }, [opsListUpdated, setOpsListUpdated, opsValues, userId])

  return (
    <AllContext.Provider value={{ ops, opToEdit, setOpToEdit, opsValues, setOpsValues, setOpsListUpdated, loading, username, setUsername, userId, setUserId}}>
      <AppRouter />
    </AllContext.Provider>
  )
}

export default App
