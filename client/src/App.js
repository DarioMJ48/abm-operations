import { useState, useEffect } from 'react'
import axios from 'axios'
import { AllContext } from './contexts/AllContext'
import AppRouter from './routes/AppRouter'

function App() {
  const [ops, setOps] = useState([])
  const [opToEdit, setOpToEdit] = useState()
  const [opsValues, setOpsValues] = useState({ type: 'All', category: 'All' })
  const [opsListUpdated, setOpsListUpdated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState()
  const [userId, setUserId] = useState()

  useEffect(() => {
    axios.get(`http://localhost:3010/users/${userId}`)
      .then((res) => setOps(res.data.Operations.reverse()))
      .catch(err => console.log(`ERROR! (${err})`))
      
    setOpsListUpdated(false)
    setLoading(false)
  }, [opsListUpdated, setOpsListUpdated, opsValues, username])

  return (
    <AllContext.Provider value={{ ops, opToEdit, setOpToEdit, opsValues, setOpsValues, setOpsListUpdated, loading, username, setUsername, userId, setUserId }}>
      <AppRouter />
    </AllContext.Provider>
  )
}

export default App
