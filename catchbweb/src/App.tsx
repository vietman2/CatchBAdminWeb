import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './components/Home';
import Members from './components/Members';
import Reservations from './components/Reservations';
import Coupons from './components/Coupons';
import Promotions from './components/Promotions';
import Support from './components/Support';
import Reviews from './components/Reviews';
import Alerts from './components/Alerts';
import Notices from './components/Notices';
import Community from './components/Community';
import Updates from './components/Updates';
import Api from './components/Api';
import Settings from './components/Settings';
import MainLayout from './components/MainLayout';
import { AuthProvider, useAuth } from './components/AuthContext';
import './App.css';

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<MainLayout />} />}
          >
            <Route index element={<Home />} />
            <Route path="members" element={<Members />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="support" element={<Support />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="notices" element={<Notices />} />
            <Route path="community" element={<Community />} />
            <Route path="updates" element={<Updates />} />
            <Route path="api" element={<Api />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
