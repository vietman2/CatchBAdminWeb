import React, { useState } from 'react';
import './Coupons.css';
import SearchBar from '@components/SearchBar/SearchBar'; 
import TextButton from '@components/Buttons/TextButton'; 
import TabPanel from '@components/Tabs/TabPanel'; 
import Modal from '@components/Modal/Modal';
import ModalButton from '@components/Buttons/ModalButton';
import Pagination from '@components/Pagination/Pagination';
import Table from '@components/Table/Table'; // Table 컴포넌트 임포트

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
  const [couponType, setCouponType] = useState('지정발행');
  const [target, setTarget] = useState('전체회원');
  const [couponCodeType, setCouponCodeType] = useState('단일 쿠폰코드');
  const [benefitType, setBenefitType] = useState('금액할인');

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
          <div className="coupon-modal-left">
            <div className="coupon-modal-field">
              <label htmlFor="coupon-name">쿠폰명:</label>
              <input id="coupon-name" type="text" placeholder="ex. [캐치비 앱출시 이벤트] 20% 할인 쿠폰" />
            </div>
            <div className="coupon-modal-field">
              <label>쿠폰형식:</label>
              <div className="radio-container">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="coupon-type" 
                    value="지정발행" 
                    checked={couponType === '지정발행'} 
                    onChange={() => {
                      setCouponType('지정발행');
                      setTarget('전체회원');
                    }}
                  />
                  지정발행
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="coupon-type" 
                    value="고객 다운로드" 
                    checked={couponType === '고객 다운로드'} 
                    onChange={() => {
                      setCouponType('고객 다운로드');
                      setTarget('전체회원');
                    }}
                  />
                  고객 다운로드
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="coupon-type" 
                    value="자동발행" 
                    checked={couponType === '자동발행'} 
                    onChange={() => {
                      setCouponType('자동발행');
                      setTarget('첫 회원가입 고객');
                    }}
                  />
                  자동발행
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="coupon-type" 
                    value="쿠폰코드 생성" 
                    checked={couponType === '쿠폰코드 생성'} 
                    onChange={() => {
                      setCouponType('쿠폰코드 생성');
                      setTarget('회원');
                    }}
                  />
                  쿠폰코드 생성
                </label>
              </div>
            </div>
            <div className="coupon-modal-field">
              <label htmlFor="target">발행대상:</label>
              <select id="target" value={target} onChange={(e) => setTarget(e.target.value)}>
                {couponType === '자동발행' ? (
                  <>
                    <option value="첫 회원가입 고객">첫 회원가입 고객</option>
                    <option value="첫 구입고객">첫 구입고객</option>
                    <option value="생일 고객">생일 고객</option>
                  </>
                ) : couponType === '쿠폰코드 생성' ? (
                  <>
                    <option value="회원">회원</option>
                    <option value="회원 + 비회원">회원 + 비회원</option>
                    <option value="비회원">비회원</option>
                  </>
                ) : (
                  <>
                    <option value="전체회원">전체회원</option>
                    <option value="아카데미 및 코치">아카데미 및 코치</option>
                    <option value="특정대상">특정대상</option>
                  </>
                )}
              </select>
            </div>
            {target === '특정대상' && (
              <div className="coupon-modal-field specific-target-field">
                <label htmlFor="specific-target">아이디 입력:</label>
                <input id="specific-target" type="text" placeholder="아이디 입력" />
              </div>
            )}
            {couponType === '고객 다운로드' && (
              <div className="coupon-modal-field">
                <label htmlFor="quantity">발행수량:</label>
                <div className="quantity-field">
                  <input id="quantity" type="text" placeholder="수량 입력" />
                  <label className="radio-label">
                    <input type="radio" name="unlimited" value="unlimited" /> 개수 제한 없음
                  </label>
                </div>
              </div>
            )}
            {couponType === '쿠폰코드 생성' && (
              <div className="coupon-modal-field coupon-code-field">
                <label htmlFor="coupon-code-type">쿠폰코드:</label>
                <select 
                  id="coupon-code-type" 
                  value={couponCodeType} 
                  onChange={(e) => setCouponCodeType(e.target.value)}
                >
                  <option value="단일 쿠폰코드">단일 쿠폰코드</option>
                  <option value="여러 쿠폰코드">여러 쿠폰코드</option>
                </select>
                {couponCodeType === '단일 쿠폰코드' && (
                  <input type="text" placeholder="원하는 코드를 입력하세요" />
                )}
                {couponCodeType === '여러 쿠폰코드' && (
                  <input type="text" placeholder="랜덤으로 생성된 코드" readOnly />
                )}
              </div>
            )}
            <div className="coupon-modal-field">
              <label htmlFor="notification">발행알림:</label>
              <select id="notification">
                <option value="사용 시작일에 알림">사용 시작일에 알림</option>
              </select>
            </div>
          </div>
          <div className="coupon-modal-right">
            <div className="coupon-modal-field benefit-field">
              <label htmlFor="benefit">사용혜택:</label>
              <select id="benefit" value={benefitType} onChange={(e) => setBenefitType(e.target.value)}>
                <option value="금액할인">금액할인</option>
                <option value="할인율(%)">할인율(%)</option>
              </select>
              {benefitType === '금액할인' && (
                <input type="text" placeholder="0 원(KRW)" />
              )}
              {benefitType === '할인율(%)' && (
                <input type="text" placeholder="0 %" />
              )}
            </div>
            <div className="coupon-modal-field">
              <label htmlFor="min-amount">최소 결제 금액:</label>
              <input id="min-amount" type="text" placeholder="0 원" />
            </div>
            {(couponType === '고객 다운로드' || couponType === '자동발행' || couponType === '쿠폰코드 생성') && (
              <>
                <div className="coupon-modal-field">
                  <label htmlFor="max-discount">최대 할인 금액:</label>
                  <input id="max-discount" type="text" placeholder="0 원" />
                </div>
                <div className="coupon-modal-field">
                  <label htmlFor="usage-limit">사용 횟수:</label>
                  <div>동일 회원이 최대 <input id="usage-limit" type="text" placeholder="0" /> 회까지 사용 가능</div>
                </div>
              </>
            )}
            {couponType === '자동발행' ? (
              <div className="coupon-modal-field">
                <label htmlFor="usage-period">사용 기간:</label>
                <div>쿠폰이 발행된 날부터 <input id="usage-period" type="text" placeholder="0" /> 일 후까지 사용가능</div>
              </div>
            ) : (
              <>
                <div className="coupon-modal-field">
                  <label htmlFor="usagePeriodStart">사용 기간 시작:</label>
                  <input id="usagePeriodStart" type="datetime-local" />
                </div>
                <div className="coupon-modal-field">
                  <label htmlFor="usagePeriodEnd">사용 기간 종료:</label>
                  <input id="usagePeriodEnd" type="datetime-local" />
                </div>
              </>
            )}
            <div className="coupon-modal-field">
              <label htmlFor="options">사용옵션:</label>
              <select id="options">
                <option value="추가할인 가능">추가할인 가능</option>
              </select>
            </div>
          </div>
        </div>
        <div className="coupon-modal-actions">
          <ModalButton
            color="#007bff"
            text="등록하기"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Coupons;
