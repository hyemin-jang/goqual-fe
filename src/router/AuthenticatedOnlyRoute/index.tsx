import React from 'react';
import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import useAuthStore from '@/store/auth';

interface AuthenticatedOnlyRouteProps {
  redirect?: string;
}

const AuthenticatedOnlyRoute = ({
  redirect = '/login',
}: AuthenticatedOnlyRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to={redirect} replace />;
  }
  return <Outlet />;
};

export default AuthenticatedOnlyRoute;
