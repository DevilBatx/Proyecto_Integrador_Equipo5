import {  Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './components/Footer';
import { ContextProvider } from './Components/Utils/GlobalContext';

function App() {
  return (
    <ContextProvider>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default App;