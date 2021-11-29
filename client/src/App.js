import useFetch from './hooks/useFetch'
import { AllContext } from './contexts/AllContext'
import AppRouter from './routes/AppRouter'

function App() {
  const [opsI, opsO, setOpsListUpdated, opToEdit, setOpToEdit, loading] = useFetch()

  return (
    <AllContext.Provider value={{ opsI, opsO, setOpsListUpdated, opToEdit, setOpToEdit, loading }}>
      <AppRouter />
    </AllContext.Provider>
  );
}

export default App;
