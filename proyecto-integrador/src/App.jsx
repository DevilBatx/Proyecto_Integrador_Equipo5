import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header'
import Home from './Routes/Home'
import Nopage from './Routes/Nopage';
import LoginSignUp from './Routes/LoginSignUp';
import Body from './Components/Body';
import Products from './Routes/Products';
import Footer from './components/Footer';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Body />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App