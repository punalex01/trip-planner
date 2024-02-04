import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Test } from './routes/test.tsx';
import { Layout } from './components/layout/Layout.tsx';
import { Home } from './components/home/home.tsx';
import { Root } from './routes/root.tsx';
import { App } from './routes/app.tsx';

const router = createBrowserRouter([
  {
    path: '/wow',
    element: <Test />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'root',
            element: <Root />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
