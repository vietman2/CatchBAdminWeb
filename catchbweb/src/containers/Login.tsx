import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/AuthContext';
import logo from '@/logo.svg';
import './Login.css';
import TextButton from '@components/Buttons/TextButton'; // 경로를 실제 파일 위치에 맞게 수정

const Login: React.FC = () => {
  const [companyAccount, setCompanyAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <form className="Login-form" onSubmit={(e) => e.preventDefault()}>
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
          <TextButton text="로그인" color="black" onClick={handleLogin} style={{ width: '100%', padding: '1vh 20px', fontSize: '2vh' }} />
        </form>
      </header>
    </div>
  );
};

export default Login;
