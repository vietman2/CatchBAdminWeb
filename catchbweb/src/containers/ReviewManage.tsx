import React, { useState } from 'react';
import './ReviewManage.css';
import SearchBar from '@components/SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트
import TabPanel from '@components/Tabs/TabPanel'; // TabPanel 컴포넌트 임포트
import Pagination from '@components/Pagination/Pagination'; // Pagination 컴포넌트 임포트
import Table from '@components/Table/Table'; // Table 컴포넌트 임포트

const dummyReviews = Array.from({ length: 50 }, (_, i) => ({
  reporterId: `user${i + 1}`,
  name: `User Name ${i + 1}`,
  academy: `Academy ${i + 1}`,
  reason: `Reason ${i + 1}`,
  reportDate: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1}`,
  status: i % 3 === 0 ? '미완료' : i % 3 === 1 ? '검토중' : '처리완료(삭제)',
}));

const ReviewManage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('전체');

  const itemsPerPage = 10;

  const filteredReviews = dummyReviews.filter(review => {
    if (filter === '전체') return true;
    return review.status === filter;
  }).filter(review =>
    review.reporterId.includes(searchTerm) ||
    review.name.includes(searchTerm) ||
    review.academy.includes(searchTerm) ||
    review.reason.includes(searchTerm)
  );

  const reviews = filteredReviews.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getCountByStatus = (status: string) => {
    return dummyReviews.filter(review => review.status === status).length;
  };

  const tabs = [
    { label: '전체', count: dummyReviews.length },
    { label: '미완료', count: getCountByStatus('미완료') },
    { label: '검토중', count: getCountByStatus('검토중') },
    { label: '처리완료', count: getCountByStatus('처리완료(삭제)') }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case '미완료':
        return 'status-incomplete';
      case '검토중':
        return 'status-review';
      case '처리완료(삭제)':
        return 'status-complete';
      default:
        return '';
    }
  };

  return (
    <div className="reviews">
      <h1>리뷰 관리</h1>
      <h2>리뷰 신고 목록</h2>
      <TabPanel 
        tabs={tabs} 
        activeTab={filter} 
        onTabClick={setFilter} 
      />
      <div className="header">
        <SearchBar
          placeholder="리뷰 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table
        headers={['신고자 ID', '이름', '신고된 아카데미명', '신고사유', '신고접수일', '처리상태']}
        data={reviews}
        renderRow={(review, index) => (
          <tr key={index}>
            <td>{review.reporterId}</td>
            <td>{review.name}</td>
            <td>{review.academy}</td>
            <td>{review.reason}</td>
            <td>{review.reportDate}</td>
            <td className={getStatusClass(review.status)}>{review.status}</td>
          </tr>
        )}
        emptyMessage="검색된 리뷰가 없습니다."
      />
      <Pagination 
        currentPage={page} 
        totalPages={Math.ceil(filteredReviews.length / itemsPerPage)} 
        onPageChange={setPage} 
      />
    </div>
  );
};

export default ReviewManage;
