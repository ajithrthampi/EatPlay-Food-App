

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import {UserAuthContextProvider } from './context/UserAuthContext';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AdminLogin from './AdminPannel/AdminLogin';
import Sidebar from './pages/Sidebarr';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';
import Payment from './pages/Payment';
import Order from './pages/Order';
import OfferManagement from './pages/OfferManagement';

import CategoryManagement from './pages/CategoryManagement';
import Dashboard1 from './pages/Dashboard1';

import CreateContainer from './components/CreateContainer';
import { AnimatePresence } from 'framer-motion';


import YourOrder from './components/YourOrder';
import Address from './components/Address';
import WishList from './components/WishList';
import CheckOut from './components/CheckOut';
import Details from './components/Details';

// import Simple from './pages/simple';
import CouponList from './pages/CouponList';
import Profilee from './components/Profilee';
import LandingPage from './components/LandingPage';




const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [ ])
  
  return (
    // <StateProvider initialState={initialState} reducer={reducer}>

    <UserAuthContextProvider>
       <AnimatePresence>
       <Router>
           <Routes>
            <Route  path="/" element={<LandingPage />} />
            <Route  path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path ="/dashboard/*" element={<Dashboard/>} />
            <Route path="/createitem" element={<CreateContainer/>} />
            <Route path ="/profile" element={<Profilee/>} />

            <Route path ="/address" element={<Address />} />
            <Route path ="/yourorder" element={<YourOrder />} />
            <Route path ="/wishlist" element={<WishList />} />
            <Route path ="/checkout" element={<CheckOut />} />
            <Route path ="/details" element={<Details />} />
            
           


            <Route path ="/adminlogin" element={<AdminLogin/>} />
            <Route path ="/admindash" element={<Sidebar/>}>
              <Route path ="admindashboard" element={<Dashboard1/>} />
              <Route path ="usermanagement" element={<UserManagement/>} />
              <Route path ="productmanagement" element={<ProductManagement/>} />
              <Route path ="categorymanagement" element={<CategoryManagement/>} />
              <Route path ="order" element={<Order/>} />
           
              <Route path ="couponlist" element={<CouponList/>} />
              <Route path ="payment" element={<Payment/>} />
              <Route path ="offermanagement" element={<OfferManagement/>} />
            </Route>
             </Routes>
       </Router>
       </AnimatePresence>
    </UserAuthContextProvider> 
       
  );
}
export default App;


