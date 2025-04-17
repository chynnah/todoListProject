import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Chart from './pages/Chart';
import Landing from './pages/Landing';
import Archive from './pages/Archive';
import Entertainment from './pages/Entertainment';
import ResetPassword from './components/auth/ResetPassword';


const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('username'); 
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('username'); 
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : element;
};

const RoutesComponent = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />

          {/* Public Routes */}
          <Route path="/landing" element={<PublicRoute element={<Landing />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/signup" element={<PublicRoute element={<Signup />} />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute element={<Layout />} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/chart" element={<Chart />} />
            <Route path="/dashboard/archive" element={<Archive />} />
            <Route path="/dashboard/entertainment" element={<Entertainment/>} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>

  );
};

export default RoutesComponent;
