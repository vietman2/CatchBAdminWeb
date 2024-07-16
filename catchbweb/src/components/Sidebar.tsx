import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../logo.svg';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/members')) {
      setIsMembersOpen(true);
      setActiveSubMenu(location.pathname);
    } else if (location.pathname.includes('/support')) {
      setIsSupportOpen(true);
      setActiveSubMenu(location.pathname);
    } else if (location.pathname.includes('/reviews')) {
      setIsReviewsOpen(true);
      setActiveSubMenu(location.pathname);
    } else if (location.pathname.includes('/community')) {
      setIsCommunityOpen(true);
      setActiveSubMenu(location.pathname);
    }
  }, [location]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setActiveSubMenu(path);
  };

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <nav>
        <ul>
          <li><button onClick={() => handleNavigate('/home')}>홈</button></li>
          <li className={`clickable ${isMembersOpen ? 'open' : ''}`} onClick={() => setIsMembersOpen(!isMembersOpen)}><button>회원관리</button>
            <ul className={`sub-menu ${isMembersOpen ? 'open' : ''}`}>
              <li><button className={activeSubMenu === '/home/members/academy' ? 'active' : ''} onClick={() => handleNavigate('/home/members/academy')}>아카데미 및 코치관리</button></li>
              <li><button className={activeSubMenu === '/home/members/general' ? 'active' : ''} onClick={() => handleNavigate('/home/members/general')}>일반회원</button></li>
            </ul>
          </li>
          <li><button onClick={() => handleNavigate('/home/reservations')}>예약관리</button></li>
          <li><button onClick={() => handleNavigate('/home/coupons')}>쿠폰관리</button></li>
          <li className={`clickable ${isSupportOpen ? 'open' : ''}`} onClick={() => setIsSupportOpen(!isSupportOpen)}><button>고객센터 관리</button>
            <ul className={`sub-menu ${isSupportOpen ? 'open' : ''}`}>
              <li><button className={activeSubMenu === '/home/support/one-to-one' ? 'active' : ''} onClick={() => handleNavigate('/home/support/one-to-one')}>1:1 문의 대응</button></li>
              <li><button className={activeSubMenu === '/home/support/faq' ? 'active' : ''} onClick={() => handleNavigate('/home/support/faq')}>FAQ</button></li>
              <li><button className={activeSubMenu === '/home/support/report' ? 'active' : ''} onClick={() => handleNavigate('/home/support/report')}>신고관리</button></li>
            </ul>
          </li>
          <li className={`clickable ${isReviewsOpen ? 'open' : ''}`} onClick={() => setIsReviewsOpen(!isReviewsOpen)}><button>리뷰 및 피드백 관리</button>
            <ul className={`sub-menu ${isReviewsOpen ? 'open' : ''}`}>
              <li><button className={activeSubMenu === '/home/reviews/manage' ? 'active' : ''} onClick={() => handleNavigate('/home/reviews/manage')}>리뷰 관리</button></li>
              <li><button className={activeSubMenu === '/home/reviews/badge' ? 'active' : ''} onClick={() => handleNavigate('/home/reviews/badge')}>피드백 및 뱃지 관리</button></li>
            </ul>
          </li>
          <li><button onClick={() => handleNavigate('/home/alerts')}>알림메시지 관리</button></li>
          <li><button onClick={() => handleNavigate('/home/notices')}>공지사항 관리</button></li>
          <li className={`clickable ${isCommunityOpen ? 'open' : ''}`} onClick={() => setIsCommunityOpen(!isCommunityOpen)}><button>커뮤니티 관리</button>
            <ul className={`sub-menu ${isCommunityOpen ? 'open' : ''}`}>
              <li><button className={activeSubMenu === '/home/community/posts' ? 'active' : ''} onClick={() => handleNavigate('/home/community/posts')}>게시글 관리</button></li>
              <li><button className={activeSubMenu === '/home/community/comments' ? 'active' : ''} onClick={() => handleNavigate('/home/community/comments')}>댓글 관리</button></li>
            </ul>
          </li>
          <li><button onClick={() => handleNavigate('/home/updates')}>업데이트 및 패치 관리</button></li>
          <li><button onClick={() => handleNavigate('/home/api')}>API 통합 및 관리</button></li>
          <li><button onClick={() => handleNavigate('/home/settings')}>시스템 설정</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
