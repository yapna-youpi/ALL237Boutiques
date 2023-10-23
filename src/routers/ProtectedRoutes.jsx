import React from 'react'
import UseAuthe from "../custom-hooks/UseAuthe"
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const { currentUser } = UseAuthe();
  return currentUser ? <Outlet /> : <Navigate to="/login/0" />;
};

export default ProtectedRoutes