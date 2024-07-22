import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import './MainLayout.css';
import TextButton from './Buttons/TextButton';

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
          <TextButton
          type={1}
          color="#000000"
          text="로그아웃"
          onClick={handleLogout}
        />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
