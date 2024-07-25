import React, { useState } from 'react';
import './Coupons.css';
import SearchBar from '../components/SearchBar/SearchBar'; 
import TextButton from '../components/Buttons/TextButton'; 
import TabPanel from '../components/Tabs/TabPanel'; 
import Modal from '../components/Modal/Modal';
import ModalButton from '../components/Buttons/ModalButton';
import Pagination from '../components/Pagination/Pagination';
import Table from '../components/Table/Table'; // Table 컴포넌트 임포트

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const tabs = [
    { label: '전체', count: dummyCoupons.length },
    { label: '진행 예정', count: getCountByStatus('진행 예정') },
    { label: '진행중', count: getCountByStatus('진행중') },
    { label: '진행 완료', count: getCountByStatus('진행 완료') }
  ];

  return (
    <div className="coupons">
      <h1>쿠폰 관리</h1>
      <TabPanel 
        tabs={tabs} 
        activeTab={filter} 
        onTabClick={setFilter} 
      />
      <div className="coupons-header">
        <SearchBar
          placeholder="쿠폰 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '20px' }}
        />
        <div>
          <TextButton 
            text="쿠폰 생성하기" 
            color="#007bff" 
            onClick={() => setIsModalOpen(true)} 
            type={1}
          />
        </div>
      </div>
      <Table
        headers={['쿠폰명/사용혜택', '상태', '쿠폰형식', '사용/발행', '사용기간', '등록일', '수정일']}
        data={coupons}
        renderRow={(coupon, index) => (
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
        )}
        emptyMessage="검색된 쿠폰이 없습니다."
      />
      <Pagination 
        currentPage={page} 
        totalPages={Math.ceil(filteredCoupons.length / itemsPerPage)} 
        onPageChange={setPage} 
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => setIsModalOpen(false)}
        title="쿠폰 생성하기"
      >
        <div className="coupon-modal-body">
          <div className="coupon-modal-field">
            <label htmlFor="coupon-name">쿠폰명:</label>
            <input id="coupon-name" type="text" placeholder="ex. [캐치비 앱출시 이벤트] 20% 할인 쿠폰" />
          </div>
          <div className="coupon-modal-field">
            <label>쿠폰형식:</label>
            <div>
              <label><input type="radio" name="coupon-type" value="지정발행" />지정발행</label>
              <label><input type="radio" name="coupon-type" value="고객 다운로드" />고객 다운로드</label>
              <label><input type="radio" name="coupon-type" value="자동발행" />자동발행</label>
              <label><input type="radio" name="coupon-type" value="쿠폰코드 생성" />쿠폰코드 생성</label>
            </div>
          </div>
          <div className="coupon-modal-field">
            <label htmlFor="target">발행대상:</label>
            <select id="target">
              <option value="전체회원">전체회원</option>
            </select>
          </div>
          <div className="coupon-modal-field">
            <label htmlFor="notification">발행알림:</label>
            <select id="notification">
              <option value="사용 시작일에 알림">사용 시작일에 알림</option>
            </select>
          </div>
          <div className="coupon-modal-field">
            <label htmlFor="benefit">사용혜택:</label>
            <select id="benefit">
              <option value="금액할인">금액할인</option>
            </select>
            <input type="text" placeholder="0 원" />
          </div>
          <div className="coupon-modal-field">
            <label htmlFor="min-amount">최소 결제금액:</label>
            <input id="min-amount" type="text" placeholder="0 원" />
          </div>
          <div className="coupon-modal-field">
            <label htmlFor="scope">쿠폰 적용범위:</label>
            <select id="scope">
              <option value="모든 상품">모든 상품</option>
              <option value="모든 상품">대관 예약</option>
              <option value="모든 상품">레슨 예약</option>
            </select>
          </div>
          <div className="coupon-modal-field">
            <label htmlFor="usagePeriodStart">사용 기간 시작:</label>
            <input id="usagePeriodStart" type="datetime-local" />
          </div>
          <div className="coupon-modal-field">
            <label htmlFor="usagePeriodEnd">사용 기간 종료:</label>
            <input id="usagePeriodEnd" type="datetime-local" />
          </div>
          <div className="coupon-modal-field">
            <label htmlFor="options">사용옵션:</label>
            <select id="options">
              <option value="추가할인 가능">추가할인 가능</option>
            </select>
          </div>
          <div className="coupon-modal-actions">
            <ModalButton
              color="#007bff"
              text="등록하기"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Coupons;
