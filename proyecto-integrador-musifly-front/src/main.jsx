import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import App from './App.jsx'
import Home from './Routes/Home.jsx'
import LoginSignUp from './Routes/LoginSignUp.jsx'
import Products from './Routes/Products.jsx'
import Nopage from './Routes/Nopage.jsx'
import Detail from './Routes/Detail.jsx'
import AdminPage from './pages/AdminPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/details/:id" element={<Detail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/administracion"element = {<AdminPage />} />
        <Route path="*" element={<Nopage />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </>,
)