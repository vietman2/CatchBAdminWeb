import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <div className="top-bar">
          <span className="user-info">{user}</span>
          <button className="logout-button" onClick={handleLogout}>로그아웃</button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
