import React, { Suspense } from 'react';
import {
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
} from 'react-router-dom';
import Home from '@/pages/Home';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => children;

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
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
