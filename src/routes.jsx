import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Chart from './pages/Chart';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('username'); 
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login and Signup Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes for Logged-in Users */}
        <Route element={<ProtectedRoute element={<Layout />} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
