import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './OneToOne.css';
import SearchBar from '@components/SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트
import TabPanel from '@components/Tabs/TabPanel'; // TabPanel 컴포넌트 임포트
import Pagination from '@components/Pagination/Pagination'; // Pagination 컴포넌트 임포트
import Table from '@components/Table/Table'; // Table 컴포넌트 임포트
import Modal from '@components/Modal/Modal';
import ModalButton from '@components/Buttons/ModalButton'; // ModalButton 컴포넌트 임포트

const dummyInquiries = Array.from({ length: 50 }, (_, i) => ({
  inquiryId: `inquiry${i + 1}`,
  name: `User Name ${i + 1}`,
  academy: `Academy ${i + 1}`,
  inquiryContent: `Inquiry Content ${i + 1}`,
  inquiryDate: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1}`,
  status: i % 3 === 0 ? '미답변' : i % 3 === 1 ? '검토중' : '처리완료',
  type: i % 4 === 0 ? '예약' : i % 4 === 1 ? '아카데미' : i % 4 === 2 ? '코치' : '기타', // 추가된 속성
  title: `Inquiry Title ${i + 1}`, // 추가된 속성
}));

const OneToOne: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [answerContent, setAnswerContent] = useState('');

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

  const tabs = [
    { label: '전체', count: dummyInquiries.length },
    { label: '미답변', count: getCountByStatus('미답변') },
    { label: '검토중', count: getCountByStatus('검토중') },
    { label: '처리완료', count: getCountByStatus('처리완료') }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case '미답변':
        return 'status-incomplete';
      case '검토중':
        return 'status-review';
      case '처리완료':
        return 'status-complete';
      default:
        return '';
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['clean']
    ]
  };

  const quillFormats = [
    'header', 'font',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link', 'image',
    'align', 'color',
    'background'
  ];

  const handleRowClick = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // 답변 등록 로직
    setIsModalOpen(false);
  };

  return (
    <div className="one-to-one">
      <h1>1:1 문의 대응</h1>
      <h2>문의 목록</h2>
      <TabPanel 
        tabs={tabs} 
        activeTab={filter} 
        onTabClick={setFilter} 
      />
      <div className="header">
        <SearchBar
          placeholder="문의 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // 필요시 스타일 추가
        />
      </div>
      <Table
        headers={['문의 ID', '이름', '문의 아카데미명', '문의 구분', '문의 날짜', '처리상태']}
        data={inquiries}
        renderRow={(inquiry, index) => (
          <tr key={index} onClick={() => handleRowClick(inquiry)}>
            <td>{inquiry.inquiryId}</td>
            <td>{inquiry.name}</td>
            <td>{inquiry.academy}</td>
            <td>{inquiry.type}</td>
            <td>{inquiry.inquiryDate}</td>
            <td className={getStatusClass(inquiry.status)}>{inquiry.status}</td>
          </tr>
        )}
        emptyMessage="검색된 문의가 없습니다."
      />
      <Pagination 
        currentPage={page} 
        totalPages={Math.ceil(filteredInquiries.length / itemsPerPage)} 
        onPageChange={setPage} 
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        title="문의 상세"
      >
        {selectedInquiry && (
          <div className="onetoone-modal-body">
            <div className="onetoone-modal-field">
              <label>문의 ID:</label>
              <div className="onetoone-modal-value">{selectedInquiry.inquiryId}</div>
            </div>
            <div className="onetoone-modal-field">
              <label>문의 구분:</label>
              <div className="onetoone-modal-value">{selectedInquiry.type}</div>
            </div>
            <div className="onetoone-modal-field">
              <label>문의 제목:</label>
              <div className="onetoone-modal-value">{selectedInquiry.title}</div>
            </div>
            <div className="onetoone-modal-field">
              <label>문의 내용:</label>
              <div className="onetoone-modal-value">{selectedInquiry.inquiryContent}</div>
            </div>
            <div className="onetoone-modal-field">
              <label>답변 내용:</label>
              <ReactQuill
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
                value={answerContent}
                onChange={setAnswerContent}
                style={{ height: '200px', overflowY: 'auto' }}
                className="answer-quill"
              />
            </div>
          </div>
        )}
        <div className="onetoone-modal-actions">
          <ModalButton
            color="#007bff"
            text="답변 등록"
            onClick={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
};

export default OneToOne;
