import React, { useState } from 'react';
import './Alerts.css';
import TextButton from '../components/Buttons/TextButton'; // TextButton 컴포넌트 임포트
import SearchBar from '../components/SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트
import TabPanel from '../components/Tabs/TabPanel'; // TabPanel 컴포넌트 임포트
import Pagination from '../components/Pagination/Pagination'; // Pagination 컴포넌트 임포트
import Table from '../components/Table/Table'; // Table 컴포넌트 임포트

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

  const tabs = [
    { label: '전체', count: dummyAlerts.length },
    { label: '일반회원', count: getCountByTarget('일반회원') },
    { label: '아카데미', count: getCountByTarget('아카데미') },
    { label: '코치', count: getCountByTarget('코치') }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case '발송 중':
        return 'status-sending';
      case '발송 완료':
        return 'status-sent';
      default:
        return '';
    }
  };

  return (
    <div className="alerts">
      <h1>알림 관리</h1>
      <TabPanel 
        tabs={tabs} 
        activeTab={filter} 
        onTabClick={setFilter} 
      />
      <div className="alerts-header">
        <SearchBar
          placeholder="알림 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '20px' }}
        />
        <div>
          <TextButton
            type={1}
            color="#007bff"
            text="알림 생성하기"
            onClick={() => console.log('알림 생성하기 버튼 클릭')}
          />
        </div>
      </div>
      <Table
        headers={['보낸 대상', '제목', '발송 시간', '발송상태']}
        data={alerts}
        renderRow={(alert, index) => (
          <tr key={index}>
            <td>{alert.target}</td>
            <td>{alert.title}</td>
            <td>{alert.sendTime}</td>
            <td className={getStatusClass(alert.status)}>{alert.status}</td>
          </tr>
        )}
        emptyMessage="검색된 알림이 없습니다."
      />
      <Pagination 
        currentPage={page} 
        totalPages={Math.ceil(filteredAlerts.length / itemsPerPage)} 
        onPageChange={setPage} 
      />
    </div>
  );
};

export default Alerts;
