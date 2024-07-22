import React, { useState } from 'react';
import './Notices.css';
import TextButton from '../components/Buttons/TextButton'; // TextButton 컴포넌트 경로 수정
import SearchBar from './SearchBar/SearchBar';

const dummyNotices = Array.from({ length: 50 }, (_, i) => ({
  title: `Notice ${i + 1}`,
  author: `Author ${i + 1}`,
  registrationDate: '2023-01-01 12:00',
  modificationDate: '2023-01-15 12:00'
}));

const Notices: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 10;

  const filteredNotices = dummyNotices.filter(notice =>
    notice.title.includes(searchTerm) ||
    notice.author.includes(searchTerm)
  );

  const notices = filteredNotices.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="notices">
      <h1>공지사항 관리</h1>
      <div className="header">
        <SearchBar
          placeholder="공지사항 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TextButton
          type={1}
          color="#007bff"
          text="공지사항 생성하기"
          onClick={() => console.log('공지사항 생성하기 버튼 클릭')}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>등록일</th>
            <th>수정일</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice, index) => (
            <tr key={index}>
              <td>{notice.title}</td>
              <td>{notice.registrationDate}</td>
              <td>{notice.modificationDate}</td>
              <td>{notice.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={page} totalPages={Math.ceil(filteredNotices.length / itemsPerPage)} onPageChange={setPage} />
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

export default Notices;
