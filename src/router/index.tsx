import React, { Suspense } from 'react';
import {
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
} from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import useAuthStore from '@/store/auth';
import AuthenticatedOnlyRoute from './AuthenticatedOnlyRoute';
import UnauthenticatedOnlyRoute from './UnauthenticatedOnlyRoute';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className="h-screen">
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-[48px] sticky bg-background border-b-1 border-b-sidebar-border top-0 z-1 px-2 flex items-center justify-between">
          <SidebarTrigger />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              useAuthStore.getState().logout();
            }}
          >
            Logout
          </Button>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  </div>
);

const Root = () => (
  <MainLayout>
    <Suspense
      fallback={(
        <div className="h-full w-full flex items-center justify-center">
          loading...
        </div>
      )}
    >
      <Outlet />
    </Suspense>
    <ScrollRestoration />
  </MainLayout>
);

const routes = [
  { path: '*', element: <div>404 Not Found</div> },
  {
    element: <UnauthenticatedOnlyRoute />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        element: <AuthenticatedOnlyRoute />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
