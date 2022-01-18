import { AllContext } from './contexts/AllContext'
import AppRouter from './routes/AppRouter'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [username, setUsername] = useLocalStorage('username', '')
  const [userId, setUserId] = useLocalStorage('id', '')
  
  return (
    <AllContext.Provider value={{username, setUsername, userId, setUserId}}>
      <AppRouter />
    </AllContext.Provider>
  )
}

export default App
