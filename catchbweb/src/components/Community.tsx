import React, { useState } from 'react';
import './Community.css';
import SearchBar from './SearchBar/SearchBar';

const dummyPosts = Array.from({ length: 50 }, (_, i) => ({
  reporterId: `user${i + 1}`,
  name: `User Name ${i + 1}`,
  postAuthor: `Post Author ${i + 1}`,
  reason: `Reason ${i + 1}`,
  reportDate: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1}`,
  status: i % 3 === 0 ? '미완료' : i % 3 === 1 ? '검토중' : '처리완료(삭제)',
}));

const dummyComments = Array.from({ length: 50 }, (_, i) => ({
  reporterId: `user${i + 1}`,
  name: `User Name ${i + 1}`,
  commentAuthor: `Comment Author ${i + 1}`,
  reason: `Reason ${i + 1}`,
  reportDate: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1}`,
  status: i % 3 === 0 ? '미완료' : i % 3 === 1 ? '검토중' : '처리완료(삭제)',
}));

const Community: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('전체');

  const itemsPerPage = 10;

  const filteredPosts = dummyPosts.filter(post => {
    if (filter === '전체') return true;
    return post.status === filter;
  }).filter(post =>
    post.reporterId.includes(searchTerm) ||
    post.name.includes(searchTerm) ||
    post.postAuthor.includes(searchTerm) ||
    post.reason.includes(searchTerm)
  );

  const filteredComments = dummyComments.filter(comment => {
    if (filter === '전체') return true;
    return comment.status === filter;
  }).filter(comment =>
    comment.reporterId.includes(searchTerm) ||
    comment.name.includes(searchTerm) ||
    comment.commentAuthor.includes(searchTerm) ||
    comment.reason.includes(searchTerm)
  );

  const posts = filteredPosts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const comments = filteredComments.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getCountByStatus = (status: string, data: any[]) => {
    return data.filter(item => item.status === status).length;
  };

  return (
    <div className="community">
      <h1>커뮤니티 관리</h1>
      <h2>게시글 신고 목록</h2>
      <div className="tabs">
        <div className={`tab ${filter === '전체' ? 'active' : ''}`} onClick={() => setFilter('전체')}>
          전체 <span>{dummyPosts.length}</span>
        </div>
        <div className={`tab ${filter === '미완료' ? 'active' : ''}`} onClick={() => setFilter('미완료')}>
          미완료 <span>{getCountByStatus('미완료', dummyPosts)}</span>
        </div>
        <div className={`tab ${filter === '검토중' ? 'active' : ''}`} onClick={() => setFilter('검토중')}>
          검토중 <span>{getCountByStatus('검토중', dummyPosts)}</span>
        </div>
        <div className={`tab ${filter === '처리완료(삭제)' ? 'active' : ''}`} onClick={() => setFilter('처리완료(삭제)')}>
          처리완료 <span>{getCountByStatus('처리완료(삭제)', dummyPosts)}</span>
        </div>
      </div>
      <div className="header">
        <SearchBar
          placeholder="게시글 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>신고자 ID</th>
            <th>이름</th>
            <th>신고된 게시글 작성자</th>
            <th>신고사유</th>
            <th>신고접수일</th>
            <th>처리상태</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td>{post.reporterId}</td>
              <td>{post.name}</td>
              <td>{post.postAuthor}</td>
              <td>{post.reason}</td>
              <td>{post.reportDate}</td>
              <td>{post.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={page} totalPages={Math.ceil(filteredPosts.length / itemsPerPage)} onPageChange={setPage} />
      <h2>댓글 신고 목록</h2>
      <div className="tabs">
        <div className={`tab ${filter === '전체' ? 'active' : ''}`} onClick={() => setFilter('전체')}>
          전체 <span>{dummyComments.length}</span>
        </div>
        <div className={`tab ${filter === '미완료' ? 'active' : ''}`} onClick={() => setFilter('미완료')}>
          미완료 <span>{getCountByStatus('미완료', dummyComments)}</span>
        </div>
        <div className={`tab ${filter === '검토중' ? 'active' : ''}`} onClick={() => setFilter('검토중')}>
          검토중 <span>{getCountByStatus('검토중', dummyComments)}</span>
        </div>
        <div className={`tab ${filter === '처리완료(삭제)' ? 'active' : ''}`} onClick={() => setFilter('처리완료(삭제)')}>
          처리완료 <span>{getCountByStatus('처리완료(삭제)', dummyComments)}</span>
        </div>
      </div>
      <div className="header">
        <SearchBar
          placeholder="댓글 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>신고자 ID</th>
            <th>이름</th>
            <th>신고된 댓글 작성자</th>
            <th>신고사유</th>
            <th>신고접수일</th>
            <th>처리상태</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr key={index}>
              <td>{comment.reporterId}</td>
              <td>{comment.name}</td>
              <td>{comment.commentAuthor}</td>
              <td>{comment.reason}</td>
              <td>{comment.reportDate}</td>
              <td>{comment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={page} totalPages={Math.ceil(filteredComments.length / itemsPerPage)} onPageChange={setPage} />
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

export default Community;
