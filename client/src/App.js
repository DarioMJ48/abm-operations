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

  useEffect(() => {
    axios.get('http://localhost:3010/operations')
      .then((res) => setOps(res.data.reverse()))
      .catch(err => console.log(`ERROR! (${err})`))
      
    setOpsListUpdated(false)
    setLoading(false)
  }, [opsListUpdated, setOpsValues])

  return (
    <AllContext.Provider value={{ ops, opToEdit, setOpToEdit, opsValues, setOpsValues, setOpsListUpdated, loading }}>
      <AppRouter />
    </AllContext.Provider>
  )
}

export default App
