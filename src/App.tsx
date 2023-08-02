import './App.css'
import ContextProvider from './contexts/UserContext'
import { RoutersMain } from './routes'

function App() {

  return (
    <>
      <ContextProvider>
        <RoutersMain />
      </ContextProvider>
    </>
  )
}

export default App
