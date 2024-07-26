import React, { useState } from 'react';
import './Alerts.css';
import TextButton from '@components/Buttons/TextButton';
import SearchBar from '@components/SearchBar/SearchBar';
import TabPanel from '@components/Tabs/TabPanel';
import Pagination from '@components/Pagination/Pagination';
import Table from '@components/Table/Table';
import Modal from '@components/Modal/Modal';
import ModalButton from '@components/Buttons/ModalButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const dummyMembers = Array.from({ length: 50 }, (_, i) => ({
  id: `member${i + 1}`,
  name: `Member ${i + 1}`,
}));

const dummyAlerts = Array.from({ length: 50 }, (_, i) => ({
  target: i % 3 === 0 ? '일반회원' : i % 3 === 1 ? '아카데미' : '코치',
  title: `Alert Title ${i + 1}`,
  sendTime: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1} 12:00`,
  status: i % 2 === 0 ? '발송 완료' : '발송 중'
}));

const Alerts: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [target, setTarget] = useState('');
  const [academySelected, setAcademySelected] = useState(false);
  const [coachSelected, setCoachSelected] = useState(false);
  const [specificTarget, setSpecificTarget] = useState('');
  const [selectedMember, setSelectedMember] = useState<{ id: string; name: string } | null>(null);
  const [content, setContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const itemsPerPage = 10;

  const filteredAlerts = dummyAlerts.filter(alert => {
    if (filter === '전체') return true;
    return alert.target === filter;
  }).filter(alert =>
    alert.target.includes(searchTerm) ||
    alert.title.includes(searchTerm) ||
    alert.sendTime.includes(searchTerm) ||
    alert.status.includes(searchTerm)
  );

  const alerts = filteredAlerts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getCountByTarget = (target: string) => {
    return dummyAlerts.filter(alert => alert.target === target).length;
  };

  const tabs = [
    { label: '전체', count: dummyAlerts.length },
    { label: '일반회원', count: getCountByTarget('일반회원') },
    { label: '아카데미', count: getCountByTarget('아카데미') },
    { label: '코치', count: getCountByTarget('코치') }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case '발송 중':
        return 'status-sending';
      case '발송 완료':
        return 'status-sent';
      default:
        return '';
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSubmit = () => {
    // 알림 생성 로직
    setIsModalOpen(false);
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
    'link', 'image', 'align', 'color', 'background'
  ];

  const handleMemberSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecificTarget(e.target.value);
    setSelectedMember(null); // Clear selected member when search term changes
  };

  const filteredMembers = dummyMembers.filter(member =>
    member.name.includes(specificTarget) || member.id.includes(specificTarget)
  ).slice(0, 5); // Show only top 5 results

  return (
    <div className="alerts">
      <h1>알림 관리</h1>
      <TabPanel 
        tabs={tabs} 
        activeTab={filter} 
        onTabClick={setFilter} 
      />
      <div className="alerts-header">
        <SearchBar
          placeholder="알림 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '20px' }}
        />
        <div>
          <TextButton
            type={1}
            color="#007bff"
            text="알림 생성하기"
            onClick={openModal}
          />
        </div>
      </div>
      <Table
        headers={['보낸 대상', '제목', '발송 시간', '발송상태']}
        data={alerts}
        renderRow={(alert, index) => (
          <tr key={index}>
            <td>{alert.target}</td>
            <td>{alert.title}</td>
            <td>{alert.sendTime}</td>
            <td className={getStatusClass(alert.status)}>{alert.status}</td>
          </tr>
        )}
        emptyMessage="검색된 알림이 없습니다."
      />
      <Pagination 
        currentPage={page} 
        totalPages={Math.ceil(filteredAlerts.length / itemsPerPage)} 
        onPageChange={setPage} 
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        title="알림 생성하기"
      >
        <div className="alert-modal-body">
          <div className="alert-modal-field">
            <label htmlFor="alert-title">알림 제목:</label>
            <input id="alert-title" type="text" placeholder="알림 제목 입력" />
          </div>
          <div className="alert-modal-field">
            <label>알림 대상:</label>
            <div className="search-container">
              <div>
                <SearchBar
                  placeholder="회원 아이디 혹은 이름 검색"
                  value={specificTarget}
                  onChange={handleMemberSearch}
                  style={{ width: '200px' }}
                />
                {specificTarget && (
                  <ul className="search-results">
                    {filteredMembers.map(member => (
                      <li key={member.id} onClick={() => {
                        setSelectedMember(member);
                        setSpecificTarget('');
                      }}>
                        {member.name} / {member.id}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="selected-member">
                {selectedMember && (
                  <div className="selected-member-box">
                    {selectedMember.name} / {selectedMember.id}
                  </div>
                )}
              </div>
              <div className="alert-radio-container">
                <label className="alert-radio-label">
                  <input 
                    type="radio" 
                    name="alert-target" 
                    value="전체회원" 
                    checked={target === '전체회원'} 
                    onChange={() => {
                      setTarget('전체회원');
                      setAcademySelected(false);
                      setCoachSelected(false);
                    }}
                  />
                  전체회원
                </label>
                <label className="alert-radio-label">
                  <input 
                    type="checkbox" 
                    name="alert-target" 
                    value="아카데미" 
                    checked={academySelected} 
                    onChange={() => {
                      setAcademySelected(!academySelected);
                      if (target === '전체회원') setTarget('');
                    }}
                  />
                  아카데미
                </label>
                <label className="alert-radio-label">
                  <input 
                    type="checkbox" 
                    name="alert-target" 
                    value="코치" 
                    checked={coachSelected} 
                    onChange={() => {
                      setCoachSelected(!coachSelected);
                      if (target === '전체회원') setTarget('');
                    }}
                  />
                  코치
                </label>
              </div>
            </div>
          </div>
          <div className="alert-modal-field">
            <label htmlFor="scheduled-time">발송예정 시간 설정:</label>
            <input 
              id="scheduled-time" 
              type="datetime-local" 
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </div>
          <div className="alert-modal-field">
            <label htmlFor="alert-content">내용:</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              formats={quillFormats}
              style={{ height: '200px', overflowY: 'auto' }}
            />
          </div>
        </div>
        <div className="alert-modal-actions">
          <ModalButton
            color="#007bff"
            text="등록하기"
            onClick={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Alerts;
