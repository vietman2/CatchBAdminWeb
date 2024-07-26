import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Promotions.css';
import TextButton from '@components/Buttons/TextButton';
import SearchBar from '@components/SearchBar/SearchBar';
import TabPanel from '@components/Tabs/TabPanel';
import Modal from '@components/Modal/Modal';
import ModalButton from '@components/Buttons/ModalButton';
import Pagination from '@components/Pagination/Pagination';
import Table from '@components/Table/Table';

const dummyPromotions = Array.from({ length: 50 }, (_, i) => ({
  eventName: `Promotion ${i + 1}`,
  status: i % 3 === 0 ? '대기' : i % 3 === 1 ? '진행중' : '종료',
  target: i % 2 === 0 ? '전체' : '지정',
  registrationDate: '2023-01-01 12:00',
  modificationDate: '2023-01-15 12:00'
}));

const dummyEvents = Array.from({ length: 50 }, (_, i) => ({
  eventName: `Event ${i + 1}`,
  status: i % 3 === 0 ? '대기' : i % 3 === 1 ? '진행중' : '종료',
  target: i % 2 === 0 ? '전체' : '지정',
  registrationDate: '2023-01-01 12:00',
  modificationDate: '2023-01-15 12:00'
}));

const Promotions: React.FC = () => {
  const [promotionPage, setPromotionPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);
  const [promotionSearchTerm, setPromotionSearchTerm] = useState('');
  const [eventSearchTerm, setEventSearchTerm] = useState('');
  const [promotionFilter, setPromotionFilter] = useState('전체');
  const [eventFilter, setEventFilter] = useState('전체');
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const itemsPerPage = 10;

  const filteredPromotions = dummyPromotions.filter(promotion => {
    if (promotionFilter === '전체') return true;
    return promotion.status === promotionFilter;
  }).filter(promotion =>
    promotion.eventName.includes(promotionSearchTerm)
  );

  const filteredEvents = dummyEvents.filter(event => {
    if (eventFilter === '전체') return true;
    return event.status === eventFilter;
  }).filter(event =>
    event.eventName.includes(eventSearchTerm)
  );

  const promotions = filteredPromotions.slice((promotionPage - 1) * itemsPerPage, promotionPage * itemsPerPage);
  const events = filteredEvents.slice((eventPage - 1) * itemsPerPage, eventPage * itemsPerPage);

  const getCountByStatus = (status: string, data: any[]) => {
    return data.filter(item => item.status === status).length;
  };

  const promotionTabs = [
    { label: '전체', count: dummyPromotions.length },
    { label: '대기', count: getCountByStatus('대기', dummyPromotions) },
    { label: '진행중', count: getCountByStatus('진행중', dummyPromotions) },
    { label: '종료', count: getCountByStatus('종료', dummyPromotions) }
  ];

  const eventTabs = [
    { label: '전체', count: dummyEvents.length },
    { label: '대기', count: getCountByStatus('대기', dummyEvents) },
    { label: '진행중', count: getCountByStatus('진행중', dummyEvents) },
    { label: '종료', count: getCountByStatus('종료', dummyEvents) }
  ];

  const quillModules = {
    toolbar: [
      [{ header: '1'}, { header: '2'}, { font: [] }],
      [{ list: 'ordered'}, { list: 'bullet' }],
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
    'link', 'image', 'align', 'color', 'background'
  ];

  const handlePromotionSubmit = () => {
    // 프로모션 등록 로직
    setIsPromotionModalOpen(false);
  };

  const handleEventSubmit = () => {
    // 이벤트 등록 로직
    setIsEventModalOpen(false);
  };

  return (
    <div className="promotions">
      <h1>프로모션 관리</h1>
      <TabPanel 
        tabs={promotionTabs} 
        activeTab={promotionFilter} 
        onTabClick={setPromotionFilter} 
      />
      <div className="promotions-header">
        <SearchBar
          placeholder="프로모션 검색"
          value={promotionSearchTerm}
          onChange={(e) => setPromotionSearchTerm(e.target.value)}
          style={{ marginRight: '20px' }}
        />
        <div>
          <TextButton
            type={1}
            color="#007bff"
            text="프로모션 생성하기"
            onClick={() => setIsPromotionModalOpen(true)}
          />
        </div>
      </div>
      <Table
        headers={['프로모션명', '상태', '대상', '등록일', '수정일']}
        data={promotions}
        renderRow={(promotion, index) => (
          <tr key={index}>
            <td>{promotion.eventName}</td>
            <td>{promotion.status}</td>
            <td>{promotion.target}</td>
            <td>{promotion.registrationDate}</td>
            <td>{promotion.modificationDate}</td>
          </tr>
        )}
        emptyMessage="검색된 프로모션이 없습니다."
      />
      <Pagination 
        currentPage={promotionPage} 
        totalPages={Math.ceil(filteredPromotions.length / itemsPerPage)} 
        onPageChange={setPromotionPage} 
      />

      <h1>이벤트 관리</h1>
      <TabPanel 
        tabs={eventTabs} 
        activeTab={eventFilter} 
        onTabClick={setEventFilter} 
      />
      <div className="events-header">
        <SearchBar
          placeholder="이벤트 검색"
          value={eventSearchTerm}
          onChange={(e) => setEventSearchTerm(e.target.value)}
          style={{ marginRight: '20px' }}
        />
        <div>
          <TextButton
            type={1}
            color="#007bff"
            text="이벤트 생성하기"
            onClick={() => setIsEventModalOpen(true)}
          />
        </div>
      </div>
      <Table
        headers={['이벤트명', '상태', '대상', '등록일', '수정일']}
        data={events}
        renderRow={(event, index) => (
          <tr key={index}>
            <td>{event.eventName}</td>
            <td>{event.status}</td>
            <td>{event.target}</td>
            <td>{event.registrationDate}</td>
            <td>{event.modificationDate}</td>
          </tr>
        )}
        emptyMessage="검색된 이벤트가 없습니다."
      />
      <Pagination 
        currentPage={eventPage} 
        totalPages={Math.ceil(filteredEvents.length / itemsPerPage)} 
        onPageChange={setEventPage} 
      />

      <Modal
        isOpen={isPromotionModalOpen}
        onClose={() => setIsPromotionModalOpen(false)}
        onSubmit={handlePromotionSubmit}
        title="프로모션 생성하기"
      >
        <div className="promotion-modal-body">
          <div className="promotion-modal-field">
            <label htmlFor="promotion-title">프로모션명:</label>
            <input id="promotion-title" type="text" />
          </div>
          <div className="promotion-modal-field">
            <label htmlFor="promotion-content">내용:</label>
            <ReactQuill
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              style={{ height: '200px', overflowY: 'auto' }}
            />
          </div>
        </div>
        <div className="promotion-modal-actions">
          <ModalButton
            color="#007bff"
            text="생성하기"
            onClick={handlePromotionSubmit}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={handleEventSubmit}
        title="이벤트 생성하기"
      >
        <div className="promotion-modal-body">
          <div className="promotion-modal-field">
            <label htmlFor="event-title">이벤트명:</label>
            <input id="event-title" type="text" />
          </div>
          <div className="promotion-modal-field">
            <label htmlFor="event-content">내용:</label>
            <ReactQuill
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              style={{ height: '200px', overflowY: 'auto' }}
            />
          </div>
        </div>
        <div className="promotion-modal-actions">
          <ModalButton
            color="#007bff"
            text="생성하기"
            onClick={handleEventSubmit}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Promotions;
