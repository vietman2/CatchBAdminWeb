import React, { useState } from 'react';
import './ReviewManage.css';
import SearchBar from '@components/SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트
import TabPanel from '@components/Tabs/TabPanel'; // TabPanel 컴포넌트 임포트
import Pagination from '@components/Pagination/Pagination'; // Pagination 컴포넌트 임포트
import Table from '@components/Table/Table'; // Table 컴포넌트 임포트
import Modal from '@components/Modal/Modal';
import ModalButton from '@components/Buttons/ModalButton'; // ModalButton 컴포넌트 임포트

const dummyReviews = Array.from({ length: 50 }, (_, i) => ({
  reporterId: `user${i + 1}`,
  name: `User Name ${i + 1}`,
  academy: `Academy ${i + 1}`,
  reason: `Reason ${i + 1}`,
  reportDate: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1}`,
  status: i % 5 === 0 ? '미완료' : i % 5 === 1 ? '검토중' : i % 5 === 2 ? '처리완료' : i % 5 === 3 ? '처리완료(경고)' : '처리완료(삭제)',
}));

const ReviewManage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [status, setStatus] = useState('');

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
    { label: '처리완료', count: getCountByStatus('처리완료') + getCountByStatus('처리완료(경고)') + getCountByStatus('처리완료(삭제)') }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case '미완료':
        return 'status-incomplete';
      case '검토중':
        return 'status-review';
      case '처리완료':
        return 'status-complete';
      case '처리완료(경고)':
        return 'status-complete';
      case '처리완료(삭제)':
        return 'status-complete';
      default:
        return '';
    }
  };

  const handleRowClick = (review: any) => {
    setSelectedReview(review);
    setStatus(review.status);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // 처리 완료 로직
    setIsModalOpen(false);
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
          <tr key={index} onClick={() => handleRowClick(review)}>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        title="리뷰 상세"
      >
        {selectedReview && (
          <div className="review-modal-body">
            <div className="review-modal-field">
              <label>신고자 ID:</label>
              <div className="review-modal-value">{selectedReview.reporterId}</div>
            </div>
            <div className="review-modal-field">
              <label>이름:</label>
              <div className="review-modal-value">{selectedReview.name}</div>
            </div>
            <div className="review-modal-field">
              <label>신고된 아카데미명:</label>
              <div className="review-modal-value">{selectedReview.academy}</div>
            </div>
            <div className="review-modal-field">
              <label>신고 사유:</label>
              <div className="review-modal-value">{selectedReview.reason}</div>
            </div>
            <div className="review-modal-field">
              <label>처리 상태:</label>
              <div className="review-modal-status">
                <label>
                  <input 
                    type="radio" 
                    value="미완료" 
                    checked={status === '미완료'} 
                    onChange={() => setStatus('미완료')}
                  />
                  미완료
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="검토중" 
                    checked={status === '검토중'} 
                    onChange={() => setStatus('검토중')}
                  />
                  검토중
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="처리완료" 
                    checked={status === '처리완료'} 
                    onChange={() => setStatus('처리완료')}
                  />
                  처리완료
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="처리완료(경고)" 
                    checked={status === '처리완료(경고)'} 
                    onChange={() => setStatus('처리완료(경고)')}
                  />
                  처리완료(경고)
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="처리완료(삭제)" 
                    checked={status === '처리완료(삭제)'} 
                    onChange={() => setStatus('처리완료(삭제)')}
                  />
                  처리완료(삭제)
                </label>
              </div>
            </div>
          </div>
        )}
        <div className="review-modal-actions">
          <ModalButton
            color="#007bff"
            text="확인"
            onClick={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ReviewManage;
