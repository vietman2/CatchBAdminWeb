import React, { useState } from 'react';
import './Alerts.css';
import TextButton from '../components/Buttons/TextButton'; // TextButton 컴포넌트 경로 수정
import SearchBar from './SearchBar/SearchBar';

const dummyAlerts = Array.from({ length: 50 }, (_, i) => ({
  target: i % 3 === 0 ? '일반회원' : i % 3 === 1 ? '아카데미' : '코치',
  title: `Alert Title ${i + 1}`,
  sendTime: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1} 12:00`,
  status: i % 2 === 0 ? '발송 완료' : '발송 중'
}));

const Alerts: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('전체');

  const itemsPerPage = 10;

  const filteredAlerts = dummyAlerts.filter(alert => {
    if (filter === '전체') return true;
    return alert.target === filter;
  }).filter(alert =>
    alert.target.includes(searchTerm) ||
    alert.title.includes(searchTerm) ||
    alert.sendTime.includes(searchTerm) ||
    alert.status.includes(searchTerm)
  );

  const alerts = filteredAlerts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getCountByTarget = (target: string) => {
    return dummyAlerts.filter(alert => alert.target === target).length;
  };

  return (
    <div className="alerts">
      <h1>알림 관리</h1>
      <div className="tabs">
        <div className={`tab ${filter === '전체' ? 'active' : ''}`} onClick={() => setFilter('전체')}>
          전체 <span>{dummyAlerts.length}</span>
        </div>
        <div className={`tab ${filter === '일반회원' ? 'active' : ''}`} onClick={() => setFilter('일반회원')}>
          일반회원 <span>{getCountByTarget('일반회원')}</span>
        </div>
        <div className={`tab ${filter === '아카데미' ? 'active' : ''}`} onClick={() => setFilter('아카데미')}>
          아카데미 <span>{getCountByTarget('아카데미')}</span>
        </div>
        <div className={`tab ${filter === '코치' ? 'active' : ''}`} onClick={() => setFilter('코치')}>
          코치 <span>{getCountByTarget('코치')}</span>
        </div>
      </div>
      <div className="header">
        <SearchBar
          placeholder="알림 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TextButton
          type={1}
          color="#007bff"
          text="알림 생성하기"
          onClick={() => console.log('알림 생성하기 버튼 클릭')}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>보낸 대상</th>
            <th>제목</th>
            <th>발송 시간</th>
            <th>발송상태</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index}>
              <td>{alert.target}</td>
              <td>{alert.title}</td>
              <td>{alert.sendTime}</td>
              <td>{alert.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={page} totalPages={Math.ceil(filteredAlerts.length / itemsPerPage)} onPageChange={setPage} />
    </div>
  );
};

const Pagination: React.FC<{ currentPage: number, totalPages: number, onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))}>&lt;</button>
      )}
      {Array.from({ length: totalPages }, (_, i) => (
        <button 
          key={i} 
          className={currentPage === i + 1 ? 'active' : ''} 
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}>&gt;</button>
      )}
    </div>
  );
};

export default Alerts;
