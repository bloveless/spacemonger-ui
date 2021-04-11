import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Systems from './pages/Systems';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: 'systems', element: <Systems /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
