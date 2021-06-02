import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Systems from './pages/Systems';
import Dashboard from './pages/Dashboard';
import MarketData from './pages/MarketData';
import RouteResearch from './pages/RouteResearch';
import LocationRouteResearch from './pages/LocationRouteResearch';
import Users from './pages/Users';
import UserStats from './pages/UserStats';
import ShipTransactions from './pages/ShipTransactions';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'systems', element: <Systems /> },
      { path: 'route-research', element: <RouteResearch /> },
      { path: 'route-research/:location_symbol', element: <LocationRouteResearch /> },
      { path: 'market-data/:location_symbol', element: <MarketData /> },
      { path: 'users', element: <Users /> },
      { path: 'users/:user_id', element: <UserStats /> },
      { path: 'users/:user_id/ships/:ship_id/transactions', element: <ShipTransactions /> },
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
