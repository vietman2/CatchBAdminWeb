import React, { useState } from 'react';
import './Community.css';
import SearchBar from '@components/SearchBar/SearchBar';
import TabPanel from '@components/Tabs/TabPanel';
import Pagination from '@components/Pagination/Pagination';
import Table from '@components/Table/Table';
import Modal from '@components/Modal/Modal';
import ModalButton from '@components/Buttons/ModalButton';

const dummyPosts = Array.from({ length: 50 }, (_, i) => ({
  reporterId: `user${i + 1}`,
  name: `User Name ${i + 1}`,
  postAuthor: `Post Author ${i + 1}`,
  reason: `Reason ${i + 1}`,
  reportDate: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1}`,
  status: i % 5 === 0 ? '미완료' : i % 5 === 1 ? '검토중' : i % 5 === 2 ? '처리완료' : i % 5 === 3 ? '처리완료(경고)' : '처리완료(삭제)',
}));

const dummyComments = Array.from({ length: 50 }, (_, i) => ({
  reporterId: `user${i + 1}`,
  name: `User Name ${i + 1}`,
  commentAuthor: `Comment Author ${i + 1}`,
  reason: `Reason ${i + 1}`,
  reportDate: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1}`,
  status: i % 5 === 0 ? '미완료' : i % 5 === 1 ? '검토중' : i % 5 === 2 ? '처리완료' : i % 5 === 3 ? '처리완료(경고)' : '처리완료(삭제)',
}));

const Community: React.FC = () => {
  const [postPage, setPostPage] = useState(1);
  const [commentPage, setCommentPage] = useState(1);
  const [postSearchTerm, setPostSearchTerm] = useState('');
  const [commentSearchTerm, setCommentSearchTerm] = useState('');
  const [postFilter, setPostFilter] = useState('전체');
  const [commentFilter, setCommentFilter] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isPostModal, setIsPostModal] = useState(true);
  const [status, setStatus] = useState('');

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
    { label: '처리완료', count: getCountByStatus('처리완료', dummyPosts) + getCountByStatus('처리완료(경고)', dummyPosts) + getCountByStatus('처리완료(삭제)', dummyPosts) }
  ];

  const commentTabs = [
    { label: '전체', count: dummyComments.length },
    { label: '미완료', count: getCountByStatus('미완료', dummyComments) },
    { label: '검토중', count: getCountByStatus('검토중', dummyComments) },
    { label: '처리완료', count: getCountByStatus('처리완료', dummyPosts) + getCountByStatus('처리완료(경고)', dummyPosts) + getCountByStatus('처리완료(삭제)', dummyPosts) }
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

  const handleRowClick = (report: any, isPost: boolean) => {
    setSelectedReport(report);
    setIsPostModal(isPost);
    setStatus(report.status);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // 처리 완료 로직
    setIsModalOpen(false);
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
            <tr key={index} onClick={() => handleRowClick(post, true)}>
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
            <tr key={index} onClick={() => handleRowClick(comment, false)}>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        title="신고 상세"
      >
        {selectedReport && (
          <div className="report-modal-body">
            <div className="report-modal-field">
              <label>신고자 ID:</label>
              <div className="report-modal-value">{selectedReport.reporterId}</div>
            </div>
            <div className="report-modal-field">
              <label>이름:</label>
              <div className="report-modal-value">{selectedReport.name}</div>
            </div>
            <div className="report-modal-field">
              <label>{isPostModal ? '신고된 게시글 작성자' : '신고된 댓글 작성자'}:</label>
              <div className="report-modal-value">{selectedReport.postAuthor || selectedReport.commentAuthor}</div>
            </div>
            <div className="report-modal-field">
              <label>신고사유:</label>
              <div className="report-modal-value">{selectedReport.reason}</div>
            </div>
            <div className="report-modal-field">
              <label>신고 접수일:</label>
              <div className="report-modal-value">{selectedReport.reportDate}</div>
            </div>
            <div className="report-modal-field">
              <label>처리 상태:</label>
              <div className="report-modal-status">
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
        <div className="report-modal-actions">
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

export default Community;
