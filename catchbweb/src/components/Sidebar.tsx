import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../logo.svg';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/members')) {
      setOpenSubMenu('members');
      setActiveSubMenu(location.pathname);
    } else if (location.pathname.includes('/support')) {
      setOpenSubMenu('support');
      setActiveSubMenu(location.pathname);
    } else if (location.pathname.includes('/reviews')) {
      setOpenSubMenu('reviews');
      setActiveSubMenu(location.pathname);
    } else {
      setOpenSubMenu(null);
      setActiveSubMenu(location.pathname);
    }
  }, [location]);

  const handleNavigate = (path: string, subMenu: string | null = null) => {
    navigate(path);
    setActiveSubMenu(path);
    if (subMenu) {
      setOpenSubMenu(subMenu);
    } else {
      setOpenSubMenu(null);
    }
  };

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <nav>
        <ul>
          <li><button className={activeSubMenu === '/home' ? 'active' : ''} onClick={() => handleNavigate('/home')}>홈</button></li>
          <li className={`clickable ${openSubMenu === 'members' ? 'open' : ''}`} onClick={() => setOpenSubMenu(openSubMenu === 'members' ? null : 'members')}>
            <button className={openSubMenu === 'members' ? 'active' : ''}>회원관리</button>
            <ul className={`sub-menu ${openSubMenu === 'members' ? 'open' : ''}`}>
              <li><button className={activeSubMenu === '/home/members/academy' ? 'active' : ''} onClick={() => handleNavigate('/home/members/academy', 'members')}>아카데미 및 코치관리</button></li>
              <li><button className={activeSubMenu === '/home/members/general' ? 'active' : ''} onClick={() => handleNavigate('/home/members/general', 'members')}>일반회원</button></li>
            </ul>
          </li>
          <li><button className={activeSubMenu === '/home/reservations' ? 'active' : ''} onClick={() => handleNavigate('/home/reservations')}>예약관리</button></li>
          <li><button className={activeSubMenu === '/home/coupons' ? 'active' : ''} onClick={() => handleNavigate('/home/coupons')}>쿠폰관리</button></li>
          <li><button className={activeSubMenu === '/home/promotions' ? 'active' : ''} onClick={() => handleNavigate('/home/promotions')}>프로모션관리</button></li>
          <li className={`clickable ${openSubMenu === 'support' ? 'open' : ''}`} onClick={() => setOpenSubMenu(openSubMenu === 'support' ? null : 'support')}>
            <button className={openSubMenu === 'support' ? 'active' : ''}>고객센터 관리</button>
            <ul className={`sub-menu ${openSubMenu === 'support' ? 'open' : ''}`}>
              <li><button className={activeSubMenu === '/home/support/one-to-one' ? 'active' : ''} onClick={() => handleNavigate('/home/support/one-to-one', 'support')}>1:1 문의 대응</button></li>
              <li><button className={activeSubMenu === '/home/support/faq' ? 'active' : ''} onClick={() => handleNavigate('/home/support/faq', 'support')}>FAQ</button></li>
            </ul>
          </li>
          <li className={`clickable ${openSubMenu === 'reviews' ? 'open' : ''}`} onClick={() => setOpenSubMenu(openSubMenu === 'reviews' ? null : 'reviews')}>
            <button className={openSubMenu === 'reviews' ? 'active' : ''}>리뷰 및 피드백 관리</button>
            <ul className={`sub-menu ${openSubMenu === 'reviews' ? 'open' : ''}`}>
              <li><button className={activeSubMenu === '/home/reviews/manage' ? 'active' : ''} onClick={() => handleNavigate('/home/reviews/manage', 'reviews')}>리뷰 관리</button></li>
              <li><button className={activeSubMenu === '/home/reviews/badge' ? 'active' : ''} onClick={() => handleNavigate('/home/reviews/badge', 'reviews')}>피드백 및 뱃지 관리</button></li>
            </ul>
          </li>
          <li><button className={activeSubMenu === '/home/alerts' ? 'active' : ''} onClick={() => handleNavigate('/home/alerts')}>알림메시지 관리</button></li>
          <li><button className={activeSubMenu === '/home/notices' ? 'active' : ''} onClick={() => handleNavigate('/home/notices')}>공지사항 관리</button></li>
          <li><button className={activeSubMenu === '/home/community' ? 'active' : ''} onClick={() => handleNavigate('/home/community')}>커뮤니티 관리</button></li>
          <li><button className={activeSubMenu === '/home/updates' ? 'active' : ''} onClick={() => handleNavigate('/home/updates')}>업데이트 및 패치 관리</button></li>
          <li><button className={activeSubMenu === '/home/api' ? 'active' : ''} onClick={() => handleNavigate('/home/api')}>API 통합 및 관리</button></li>
          <li><button className={activeSubMenu === '/home/settings' ? 'active' : ''} onClick={() => handleNavigate('/home/settings')}>시스템 설정</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
