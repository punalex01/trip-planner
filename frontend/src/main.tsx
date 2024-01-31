import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Test } from './routes/test.tsx';
import { Layout } from './components/layout/Layout.tsx';

const router = createBrowserRouter([
  {
    path: '/wow',
    element: <Test />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'test',
        element: <Test />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
