import React, { useState } from 'react';
import './Notices.css';
import TextButton from '../components/Buttons/TextButton'; // TextButton 컴포넌트 경로 수정
import SearchBar from '../components/SearchBar/SearchBar';
import Pagination from '../components/Pagination/Pagination'; // Pagination 컴포넌트 임포트
import Table from '../components/Table/Table'; // Table 컴포넌트 임포트

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
      <div className="notices-header">
        <SearchBar
          placeholder="공지사항 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '20px' }}
        />
        <div>
          <TextButton
            type={1}
            color="#007bff"
            text="공지사항 생성하기"
            onClick={() => console.log('공지사항 생성하기 버튼 클릭')}
          />
        </div>
      </div>
      <Table
        headers={['제목', '등록일', '수정일', '작성자']}
        data={notices}
        renderRow={(notice, index) => (
          <tr key={index}>
            <td>{notice.title}</td>
            <td>{notice.registrationDate}</td>
            <td>{notice.modificationDate}</td>
            <td>{notice.author}</td>
          </tr>
        )}
        emptyMessage="공지사항이 없습니다."
      />
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(filteredNotices.length / itemsPerPage)}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Notices;
