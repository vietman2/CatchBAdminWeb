import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Faq.css';
import TextButton from '@components/Buttons/TextButton';
import SearchBar from '@components/SearchBar/SearchBar';
import TabPanel from '@components/Tabs/TabPanel';
import Modal from '@components/Modal/Modal';
import ModalButton from '@components/Buttons/ModalButton'; // ModalButton 컴포넌트 임포트
import Pagination from '@components/Pagination/Pagination'; // Pagination 컴포넌트 임포트
import Table from '@components/Table/Table'; // Table 컴포넌트 임포트

const dummyFaqs = Array.from({ length: 50 }, (_, i) => ({
  question: `[${i % 5 === 0 ? '예약' : i % 5 === 1 ? '아카데미' : i % 5 === 2 ? '레슨' : i % 5 === 3 ? '이벤트' : '프로모드'}] FAQ Question ${i + 1}`,
  answer: `FAQ Answer ${i + 1}`,
  status: i % 3 === 0 ? '진행 예정' : i % 3 === 1 ? '진행중' : '진행 완료',
  type: i % 2 === 0 ? '지정발행' : '전체발행',
  usage: `${i}회 / ${i + 10}회`,
  usagePeriodStart: `2024-01-01 00:00`,
  usagePeriodEnd: `2024-12-31 23:59`,
  registrationDate: '2023-01-01 12:00',
  modificationDate: '2023-01-15 12:00'
}));

const Faq: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10;

  const filteredFaqs = dummyFaqs.filter(faq => {
    if (filter === '전체') return true;
    return faq.question.startsWith(`[${filter}]`);
  }).filter(faq =>
    faq.question.includes(searchTerm) ||
    faq.answer.includes(searchTerm) ||
    faq.type.includes(searchTerm)
  );

  const faqs = filteredFaqs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getCountByCategory = (category: string) => {
    return dummyFaqs.filter(faq => faq.question.startsWith(`[${category}]`)).length;
  };

  const tabs = [
    { label: '전체', count: dummyFaqs.length },
    { label: '예약', count: getCountByCategory('예약') },
    { label: '아카데미', count: getCountByCategory('아카데미') },
    { label: '레슨', count: getCountByCategory('레슨') },
    { label: '이벤트', count: getCountByCategory('이벤트') },
    { label: '프로모드', count: getCountByCategory('프로모드') }
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

  const handleSubmit = () => {
    // FAQ 등록 로직
    setIsModalOpen(false);
  };

  return (
    <div className="faqs">
      <h1>FAQ(자주 묻는 질문)</h1>
      <TabPanel 
        tabs={tabs} 
        activeTab={filter} 
        onTabClick={setFilter} 
      />
      <div className="faqs-header">
        <SearchBar
          placeholder="FAQ 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '20px' }}
        />
        <div>
          <TextButton
            type={1}
            color="#007bff"
            text="FAQ 생성하기"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      <Table
        headers={['질문', '답변', '상태', '타입', '사용/발행', '사용기간', '등록일', '수정일']}
        data={faqs}
        renderRow={(faq, index) => (
          <tr key={index}>
            <td>{faq.question}</td>
            <td>{faq.answer}</td>
            <td>{faq.status}</td>
            <td>{faq.type}</td>
            <td>{faq.usage}</td>
            <td>
              <div>{`${faq.usagePeriodStart} 부터`}</div>
              <div>{`${faq.usagePeriodEnd} 까지`}</div>
            </td>
            <td>{faq.registrationDate}</td>
            <td>{faq.modificationDate}</td>
          </tr>
        )}
        emptyMessage="검색된 FAQ가 없습니다."
      />
      <Pagination 
        currentPage={page} 
        totalPages={Math.ceil(filteredFaqs.length / itemsPerPage)} 
        onPageChange={setPage} 
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        title="FAQ 게시글 생성"
      >
        <div className="faq-modal-body">
          <div className="faq-modal-field">
            <label htmlFor="category">분류:</label>
            <select id="category">
              <option value="예약">예약</option>
              <option value="아카데미">아카데미</option>
              <option value="레슨">레슨</option>
              <option value="이벤트">이벤트</option>
              <option value="프로모드">프로모드</option>
            </select>
          </div>
          <div className="faq-modal-field">
            <label htmlFor="title">게시글 제목:</label>
            <input id="title" type="text" />
          </div>
          <div className="faq-modal-field">
            <label htmlFor="content">내용:</label>
            <ReactQuill
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              style={{ height: '200px', overflowY: 'auto' }}
            />
          </div>
        </div>
        <div className="faq-modal-actions">
          <ModalButton
            color="#007bff"
            text="생성하기"
            onClick={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Faq;
