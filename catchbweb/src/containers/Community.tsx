import React, { useState } from 'react';
import './Community.css';
import SearchBar from '../components/SearchBar/SearchBar';
import TabPanel from '../components/Tabs/TabPanel'; // TabPanel 컴포넌트 임포트
import Pagination from '../components/Pagination/Pagination'; // Pagination 컴포넌트 임포트
import Table from '../components/Table/Table'; // Table 컴포넌트 임포트

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
  const [postPage, setPostPage] = useState(1);
  const [commentPage, setCommentPage] = useState(1);
  const [postSearchTerm, setPostSearchTerm] = useState('');
  const [commentSearchTerm, setCommentSearchTerm] = useState('');
  const [postFilter, setPostFilter] = useState('전체');
  const [commentFilter, setCommentFilter] = useState('전체');

  const itemsPerPage = 10;

  const filteredPosts = dummyPosts.filter(post => {
    if (postFilter === '전체') return true;
    return post.status === postFilter;
  }).filter(post =>
    post.reporterId.includes(postSearchTerm) ||
    post.name.includes(postSearchTerm) ||
    post.postAuthor.includes(postSearchTerm) ||
    post.reason.includes(postSearchTerm)
  );

  const filteredComments = dummyComments.filter(comment => {
    if (commentFilter === '전체') return true;
    return comment.status === commentFilter;
  }).filter(comment =>
    comment.reporterId.includes(commentSearchTerm) ||
    comment.name.includes(commentSearchTerm) ||
    comment.commentAuthor.includes(commentSearchTerm) ||
    comment.reason.includes(commentSearchTerm)
  );

  const posts = filteredPosts.slice((postPage - 1) * itemsPerPage, postPage * itemsPerPage);
  const comments = filteredComments.slice((commentPage - 1) * itemsPerPage, commentPage * itemsPerPage);

  const getCountByStatus = (status: string, data: any[]) => {
    return data.filter(item => item.status === status).length;
  };

  const postTabs = [
    { label: '전체', count: dummyPosts.length },
    { label: '미완료', count: getCountByStatus('미완료', dummyPosts) },
    { label: '검토중', count: getCountByStatus('검토중', dummyPosts) },
    { label: '처리완료', count: getCountByStatus('처리완료(삭제)', dummyPosts) }
  ];

  const commentTabs = [
    { label: '전체', count: dummyComments.length },
    { label: '미완료', count: getCountByStatus('미완료', dummyComments) },
    { label: '검토중', count: getCountByStatus('검토중', dummyComments) },
    { label: '처리완료', count: getCountByStatus('처리완료(삭제)', dummyComments) }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case '미완료':
        return 'status-incomplete';
      case '검토중':
        return 'status-review';
      case '처리완료(삭제)':
        return 'status-complete';
      default:
        return '';
    }
  };

  return (
    <div className="community">
      <h1>커뮤니티 관리</h1>
      <section className="section">
        <h2>게시글 신고 목록</h2>
        <TabPanel 
          tabs={postTabs} 
          activeTab={postFilter} 
          onTabClick={setPostFilter} 
        />
        <div className="header">
          <SearchBar
            placeholder="게시글 검색"
            value={postSearchTerm}
            onChange={(e) => setPostSearchTerm(e.target.value)}
          />
        </div>
        <Table
          headers={['신고자 ID', '이름', '신고된 게시글 작성자', '신고사유', '신고접수일', '처리상태']}
          data={posts}
          renderRow={(post, index) => (
            <tr key={index}>
              <td>{post.reporterId}</td>
              <td>{post.name}</td>
              <td>{post.postAuthor}</td>
              <td>{post.reason}</td>
              <td>{post.reportDate}</td>
              <td className={getStatusClass(post.status)}>{post.status}</td>
            </tr>
          )}
          emptyMessage="게시글 신고가 없습니다."
        />
        <Pagination currentPage={postPage} totalPages={Math.ceil(filteredPosts.length / itemsPerPage)} onPageChange={setPostPage} />
      </section>
      <section className="section">
        <h2>댓글 신고 목록</h2>
        <TabPanel 
          tabs={commentTabs} 
          activeTab={commentFilter} 
          onTabClick={setCommentFilter} 
        />
        <div className="header">
          <SearchBar
            placeholder="댓글 검색"
            value={commentSearchTerm}
            onChange={(e) => setCommentSearchTerm(e.target.value)}
          />
        </div>
        <Table
          headers={['신고자 ID', '이름', '신고된 댓글 작성자', '신고사유', '신고접수일', '처리상태']}
          data={comments}
          renderRow={(comment, index) => (
            <tr key={index}>
              <td>{comment.reporterId}</td>
              <td>{comment.name}</td>
              <td>{comment.commentAuthor}</td>
              <td>{comment.reason}</td>
              <td>{comment.reportDate}</td>
              <td className={getStatusClass(comment.status)}>{comment.status}</td>
            </tr>
          )}
          emptyMessage="댓글 신고가 없습니다."
        />
        <Pagination currentPage={commentPage} totalPages={Math.ceil(filteredComments.length / itemsPerPage)} onPageChange={setCommentPage} />
      </section>  
    </div>
  );
};

export default Community;
