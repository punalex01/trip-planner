import '../index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../components/layout/Layout.tsx';
import { Home } from '../components/home/Home.tsx';
import { App } from '../router/routes/app.tsx';
import { PaymentsModule } from '../components/financials/paymentsModule/PaymentsModule.tsx';
import { DebtsModule } from '../components/financials/debts/DebtsModule.tsx';
import { IndividualBalancesModule } from '../components/financials/individual/IndividualModule.tsx';
import { useAuthContext } from 'src/context/auth/AuthContext.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { LoginRoute } from './routes/login.tsx';
import { RegisterRoute } from './routes/register.tsx';

const Router = () => {
  const { token } = useAuthContext();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: '/service',
      element: <div>Service Page</div>,
    },
    {
      path: '/about-us',
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
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
                  path: 'financials/',
                  children: [
                    {
                      path: 'payments',
                      element: <PaymentsModule />,
                    },
                    {
                      path: 'debts',
                      element: <DebtsModule />,
                    },
                    {
                      path: 'individual',
                      element: <IndividualBalancesModule />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: <div>Home Page</div>,
    },
    {
      path: '/login',
      element: <LoginRoute />,
    },
    {
      path: '/register',
      element: <RegisterRoute />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Router;
