import React from 'react';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import MyAccount from '../Dashboard/user-account/MyAccount';
import  Dashboard  from '../Dashboard/pro-account/Dashboard';
import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Pros from '../pages/Pros/Pros';
import ProDetails from '../pages/Pros/ProDetails';

const Routers = () => {
  return (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/home' element={<Home />} />
    <Route path='/pros' element={<Pros />} />
    <Route path='/pros/:id' element={<ProDetails />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Signup />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/services' element={<Services />} />
    <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['client']}><MyAccount /></ProtectedRoute>} />
    <Route path='/pros/profile/me' element={<ProtectedRoute allowedRoles={['pro']}><Dashboard /></ProtectedRoute>} />
  </Routes>
  );
};

export default Routers;