import React, { useState } from 'react';
import './ReviewManage.css';
import SearchBar from '../components/SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트

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

  return (
    <div className="reviews">
      <h1>리뷰 관리</h1>
      <h2>리뷰 신고 목록</h2>
      <div className="tabs">
        <div className={`tab ${filter === '전체' ? 'active' : ''}`} onClick={() => setFilter('전체')}>
          전체 <span>{dummyReviews.length}</span>
        </div>
        <div className={`tab ${filter === '미완료' ? 'active' : ''}`} onClick={() => setFilter('미완료')}>
          미완료 <span>{getCountByStatus('미완료')}</span>
        </div>
        <div className={`tab ${filter === '검토중' ? 'active' : ''}`} onClick={() => setFilter('검토중')}>
          검토중 <span>{getCountByStatus('검토중')}</span>
        </div>
        <div className={`tab ${filter === '처리완료(삭제)' ? 'active' : ''}`} onClick={() => setFilter('처리완료(삭제)')}>
          처리완료 <span>{getCountByStatus('처리완료(삭제)')}</span>
        </div>
      </div>
      <div className="header">
        <SearchBar
          placeholder="리뷰 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>신고자 ID</th>
            <th>이름</th>
            <th>신고된 아카데미명</th>
            <th>신고사유</th>
            <th>신고접수일</th>
            <th>처리상태</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{review.reporterId}</td>
              <td>{review.name}</td>
              <td>{review.academy}</td>
              <td>{review.reason}</td>
              <td>{review.reportDate}</td>
              <td>{review.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={page} totalPages={Math.ceil(filteredReviews.length / itemsPerPage)} onPageChange={setPage} />
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

export default ReviewManage;
