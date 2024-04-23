import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  console.log('currentUser', currentUser);
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}
