import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Notices.css';
import TextButton from '@components/Buttons/TextButton';
import SearchBar from '@components/SearchBar/SearchBar';
import Pagination from '@components/Pagination/Pagination';
import Table from '@components/Table/Table';
import Modal from '@components/Modal/Modal';
import ModalButton from '@components/Buttons/ModalButton';

const dummyNotices = Array.from({ length: 50 }, (_, i) => ({
  title: `Notice ${i + 1}`,
  author: `Author ${i + 1}`,
  registrationDate: '2023-01-01 12:00',
  modificationDate: '2023-01-15 12:00'
}));

const Notices: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10;

  const filteredNotices = dummyNotices.filter(notice =>
    notice.title.includes(searchTerm) ||
    notice.author.includes(searchTerm)
  );

  const notices = filteredNotices.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
    // 공지사항 등록 로직
    setIsModalOpen(false);
  };

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
            onClick={() => setIsModalOpen(true)}
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        title="공지사항 생성"
      >
        <div className="notice-modal-body">
          <div className="notice-modal-field">
            <label htmlFor="title">제목:</label>
            <input id="title" type="text" />
          </div>
          <div className="notice-modal-field">
            <label htmlFor="content">내용:</label>
            <ReactQuill
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              style={{ height: '200px', overflowY: 'auto' }}
            />
          </div>
        </div>
        <div className="notice-modal-actions">
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

export default Notices;
