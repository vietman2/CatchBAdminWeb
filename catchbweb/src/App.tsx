import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './containers/Login';
import Home from './containers/Home';
import Members from './containers/Members';
import AcademyCoach from './containers/AcademyCoach';
import MembersGeneral from './containers/MembersGeneral';
import Reservations from './containers/Reservations';
import Coupons from './containers/Coupons';
import Promotions from './containers/Promotions';
import Support from './containers/Support';
import Reviews from './containers/Reviews';
import ReviewManage from './containers/ReviewManage';
import OneToOne from './containers/OneToOne';
import Faq from './containers/Faq';
import Alerts from './containers/Alerts';
import Notices from './containers/Notices';
import Community from './containers/Community';
import Updates from './containers/Updates';
import Api from './containers/Api';
import Settings from './containers/Settings';
import MainLayout from './containers/MainLayout';
import { AuthProvider, useAuth } from './AuthContext';
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
            <Route path="members/academy" element={<AcademyCoach />} />
            <Route path="members/general" element={<MembersGeneral />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="support" element={<Support />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="reviews/manage" element={<ReviewManage />} />
            <Route path="support/one-to-one" element={<OneToOne />} />
            <Route path="support/faq" element={<Faq />} />
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
