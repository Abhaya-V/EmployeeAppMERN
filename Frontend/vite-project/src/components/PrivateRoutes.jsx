import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const accessToken = sessionStorage.getItem("token");
  
  return accessToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
