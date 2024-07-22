import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Faq.css';
import TextButton from '../components/Buttons/TextButton'; // TextButton 컴포넌트 경로 수정
import SearchBar from '../components/SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트

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

  return (
    <div className="faqs">
      <h1>FAQ(자주 묻는 질문)</h1>
      <div className="tabs">
        <div className={`tab ${filter === '전체' ? 'active' : ''}`} onClick={() => setFilter('전체')}>
          전체 <span>{dummyFaqs.length}</span>
        </div>
        <div className={`tab ${filter === '예약' ? 'active' : ''}`} onClick={() => setFilter('예약')}>
          예약 <span>{getCountByCategory('예약')}</span>
        </div>
        <div className={`tab ${filter === '아카데미' ? 'active' : ''}`} onClick={() => setFilter('아카데미')}>
          아카데미 <span>{getCountByCategory('아카데미')}</span>
        </div>
        <div className={`tab ${filter === '레슨' ? 'active' : ''}`} onClick={() => setFilter('레슨')}>
          레슨 <span>{getCountByCategory('레슨')}</span>
        </div>
        <div className={`tab ${filter === '이벤트' ? 'active' : ''}`} onClick={() => setFilter('이벤트')}>
          이벤트 <span>{getCountByCategory('이벤트')}</span>
        </div>
        <div className={`tab ${filter === '프로모드' ? 'active' : ''}`} onClick={() => setFilter('프로모드')}>
          프로모드 <span>{getCountByCategory('프로모드')}</span>
        </div>
      </div>
      <div className="header">
        <SearchBar
          placeholder="FAQ 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{marginRight: '10px'}}

        />
        <TextButton
          type={1}
          color="#007bff"
          text="FAQ 생성하기"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>질문</th>
            <th>답변</th>
            <th>상태</th>
            <th>타입</th>
            <th>사용/발행</th>
            <th>사용기간</th>
            <th>등록일</th>
            <th>수정일</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq, index) => (
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
          ))}
        </tbody>
      </table>
      <Pagination currentPage={page} totalPages={Math.ceil(filteredFaqs.length / itemsPerPage)} onPageChange={setPage} />

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>FAQ 게시글 생성</h2>
            </div>
            <div className="modal-field">
              <label htmlFor="category">분류:</label>
              <select id="category">
                <option value="예약">예약</option>
                <option value="아카데미">아카데미</option>
                <option value="레슨">레슨</option>
                <option value="이벤트">이벤트</option>
                <option value="프로모드">프로모드</option>
              </select>
            </div>
            <div className="modal-field">
              <label htmlFor="title">게시글 제목:</label>
              <input id="title" type="text" />
            </div>
            <div className="modal-field">
              <label htmlFor="content">내용:</label>
              <ReactQuill
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
                style={{ height: '200px', overflowY: 'auto' }}
              />
            </div>
            <div className="modal-actions">
              <TextButton
                type={1}
                color="#007bff"
                text="등록하기"
                onClick={() => setIsModalOpen(false)}
              />
              <TextButton
                type={1}
                color="#ddd"
                text="취소"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
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

export default Faq;
