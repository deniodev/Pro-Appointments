import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const ProtectedRoute = (children, alloedRoles) => {
  
    const {token, role} = useContext(authContext);

    const isAllowed = alloedRoles.includes(role);
    const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true}/>

    return accessibleRoute;
}

export default ProtectedRoute