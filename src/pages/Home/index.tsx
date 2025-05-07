import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/auth';

const Home = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <Navigate
      to={isAuthenticated ? '/dashboard' : '/login'}
      replace
    />
  );
};

export default Home;
