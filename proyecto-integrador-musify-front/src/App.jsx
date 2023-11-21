import {  Outlet } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';
import { ContextProvider } from './Components/Utils/GlobalContext';

// Prueba git lab

function App() {

  return (
    <ContextProvider>
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
    </ContextProvider>
  )
}

export default App