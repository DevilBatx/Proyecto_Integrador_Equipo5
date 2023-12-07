import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx'
import Home from './Routes/Home.jsx'
import SignIn from './Routes/SignIn.jsx';
import SignUp from './Routes/SignUp.jsx';
import Products from './Routes/Products.jsx'
import Nopage from './Routes/Nopage.jsx'
import Detail from './Routes/Detail.jsx'
import AdminPage from './pages/AdminPage.jsx'
import AgregarProducto from './pages/AgregarProducto.jsx'
import ManageProducts from './pages/ManageProducts.jsx'
import './index.css'
import Profile from './Routes/Profile.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import ListAllUsersPage from './pages/ListAllUsersPage.jsx';
import Politicas from './Routes/Politicas.jsx';
import ManageCategories from './pages/ManageCategories.jsx';
import Reservas from './Routes/Reservas.jsx';
import SearchList from './Routes/SearchList.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/details/:id" element={<Detail />} />
          <Route path="/categories/:id" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/administracion" element={<AdminPage />} />
          <Route path="/allproducts" element={<ManageProducts />} />
          <Route path="/allusers" element={<ListAllUsersPage />} />
          <Route path="/adminCategories" element={<ManageCategories />} />
          <Route path="/agregarproducto" element={<AgregarProducto />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path='/profile' element={<Profile/>} /> 
          <Route path='/politicas' element={<Politicas/>}/>
          <Route path='/reservas/:productId' element={<Reservas />} />        
          <Route path='/searchlist' element={<SearchList />} />        
          <Route path="*" element={<Nopage />} />
          <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </>
);
