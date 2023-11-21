import {  Outlet } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import { ContextProvider } from './Components/Utils/GlobalContext.jsx';

// Push para GitLab

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