import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';
import logo from './logo.svg';
import './Login.css';

const Login: React.FC = () => {
  const [companyAccount, setCompanyAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // 임시 로그인 로직
    if (companyAccount && password) {
      login(companyAccount);
      navigate('/home');
    } else {
      alert('회사계정과 비밀번호를 입력하세요.');
    }
  };

  return (
    <div className="Login">
      <header className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
        <form className="Login-form" onSubmit={handleLogin}>
          <div className={`form-group ${companyAccount ? 'has-value' : ''}`}>
            <input
              type="text"
              id="companyAccount"
              name="companyAccount"
              value={companyAccount}
              onChange={(e) => setCompanyAccount(e.target.value)}
              required
            />
            <label htmlFor="companyAccount" className="form-label">회사계정</label>
          </div>
          <div className={`form-group ${password ? 'has-value' : ''}`}>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="form-label">비밀번호</label>
          </div>
          <button type="submit" className="login-button">로그인</button>
        </form>
      </header>
    </div>
  );
};

export default Login;
