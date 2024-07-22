// components/Coupons.tsx
import React, { useState } from 'react';
import './Coupons.css';
import SearchBar from './SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트
import TextButton from './Buttons/TextButton'; // TextButton 컴포넌트 임포트

const getStatus = (startDate: string, endDate: string): string => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (now < start) return '진행 예정';
  if (now > end) return '진행 완료';
  return '진행중';
};

const dummyCoupons = Array.from({ length: 50 }, (_, i) => ({
  name: `Coupon ${i + 1}`,
  benefit: `Benefit ${i + 1}`,
  status: getStatus(`2024-01-01 00:00`, `2024-12-31 23:59`),
  type: i % 2 === 0 ? '지정발행' : '전체발행',
  usage: `${i}회 / ${i + 10}회`,
  usagePeriodStart: `2024-01-01 00:00`,
  usagePeriodEnd: `2024-12-31 23:59`,
  registrationDate: '2023-01-01 12:00',
  modificationDate: '2023-01-15 12:00'
}));

const Coupons: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('전체');

  const itemsPerPage = 10;

  const filteredCoupons = dummyCoupons.filter(coupon => {
    if (filter === '전체') return true;
    return coupon.status === filter;
  }).filter(coupon =>
    coupon.name.includes(searchTerm) ||
    coupon.benefit.includes(searchTerm) ||
    coupon.type.includes(searchTerm)
  );

  const coupons = filteredCoupons.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getCountByStatus = (status: string) => {
    return dummyCoupons.filter(coupon => coupon.status === status).length;
  };

  return (
    <div className="coupons">
      <h1>쿠폰 관리</h1>
      <div className="tabs">
        <div className={`tab ${filter === '전체' ? 'active' : ''}`} onClick={() => setFilter('전체')}>
          전체 <span>{dummyCoupons.length}</span>
        </div>
        <div className={`tab ${filter === '진행 예정' ? 'active' : ''}`} onClick={() => setFilter('진행 예정')}>
          대기 <span>{getCountByStatus('진행 예정')}</span>
        </div>
        <div className={`tab ${filter === '진행중' ? 'active' : ''}`} onClick={() => setFilter('진행중')}>
          진행중 <span>{getCountByStatus('진행중')}</span>
        </div>
        <div className={`tab ${filter === '진행 완료' ? 'active' : ''}`} onClick={() => setFilter('진행 완료')}>
          종료 <span>{getCountByStatus('진행 완료')}</span>
        </div>
      </div>
      <div className="header">
        <SearchBar
          placeholder="쿠폰 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px' }} // 필요시 스타일 추가
        />
        <TextButton 
          text="쿠폰 생성하기" 
          color="#007bff" 
          onClick={() => { /* 쿠폰 생성 로직 추가 */ }} 
          type={1}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>쿠폰명/사용혜택</th>
            <th>상태</th>
            <th>쿠폰형식</th>
            <th>사용/발행</th>
            <th>사용기간</th>
            <th>등록일</th>
            <th>수정일</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={index}>
              <td>
                <div>{coupon.name}</div>
                <div className="benefit">{coupon.benefit}</div>
              </td>
              <td>{coupon.status}</td>
              <td>{coupon.type}</td>
              <td>{coupon.usage}</td>
              <td>
                <div>{`${coupon.usagePeriodStart} 부터`}</div>
                <div>{`${coupon.usagePeriodEnd} 까지`}</div>
              </td>
              <td>{coupon.registrationDate}</td>
              <td>{coupon.modificationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={page} totalPages={Math.ceil(filteredCoupons.length / itemsPerPage)} onPageChange={setPage} />
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

export default Coupons;
