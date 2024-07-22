import React, { useState } from 'react';
import './OneToOne.css';
import SearchBar from './SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트

const dummyInquiries = Array.from({ length: 50 }, (_, i) => ({
  inquiryId: `inquiry${i + 1}`,
  name: `User Name ${i + 1}`,
  academy: `Academy ${i + 1}`,
  inquiryContent: `Inquiry Content ${i + 1}`,
  inquiryDate: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1}`,
  status: i % 3 === 0 ? '미답변' : i % 3 === 1 ? '검토중' : '처리완료',
}));

const OneToOne: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('전체');

  const itemsPerPage = 10;

  const filteredInquiries = dummyInquiries.filter(inquiry => {
    if (filter === '전체') return true;
    return inquiry.status === filter;
  }).filter(inquiry =>
    inquiry.inquiryId.includes(searchTerm) ||
    inquiry.name.includes(searchTerm) ||
    inquiry.academy.includes(searchTerm) ||
    inquiry.inquiryContent.includes(searchTerm)
  );

  const inquiries = filteredInquiries.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getCountByStatus = (status: string) => {
    return dummyInquiries.filter(inquiry => inquiry.status === status).length;
  };

  return (
    <div className="one-to-one">
      <h1>1:1 문의 대응</h1>
      <h2>문의 목록</h2>
      <div className="tabs">
        <div className={`tab ${filter === '전체' ? 'active' : ''}`} onClick={() => setFilter('전체')}>
          전체 <span>{dummyInquiries.length}</span>
        </div>
        <div className={`tab ${filter === '미답변' ? 'active' : ''}`} onClick={() => setFilter('미답변')}>
          미답변 <span>{getCountByStatus('미답변')}</span>
        </div>
        <div className={`tab ${filter === '검토중' ? 'active' : ''}`} onClick={() => setFilter('검토중')}>
          검토중 <span>{getCountByStatus('검토중')}</span>
        </div>
        <div className={`tab ${filter === '처리완료' ? 'active' : ''}`} onClick={() => setFilter('처리완료')}>
          처리완료 <span>{getCountByStatus('처리완료')}</span>
        </div>
      </div>
      <div className="header">
        <SearchBar
          placeholder="문의 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
           // 필요시 스타일 추가
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>문의 ID</th>
            <th>이름</th>
            <th>문의 아카데미명</th>
            <th>문의 내용</th>
            <th>문의 날짜</th>
            <th>처리상태</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={index}>
              <td>{inquiry.inquiryId}</td>
              <td>{inquiry.name}</td>
              <td>{inquiry.academy}</td>
              <td>{inquiry.inquiryContent}</td>
              <td>{inquiry.inquiryDate}</td>
              <td>{inquiry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={page} totalPages={Math.ceil(filteredInquiries.length / itemsPerPage)} onPageChange={setPage} />
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

export default OneToOne;
