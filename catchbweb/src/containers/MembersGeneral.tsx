import React, { useState } from 'react';
import './MembersGeneral.css';
import TextButton from '@components/Buttons/TextButton';
import SearchBar from '@components/SearchBar/SearchBar';
import Modal from '@components/Modal/Modal';
import Pagination from '@components/Pagination/Pagination';
import Table from '@components/Table/Table'; // Table 컴포넌트 임포트

const dummyData = {
  members: Array.from({ length: 50 }, (_, i) => ({
    name: `Member ${i + 1}`,
    nickname: `Nickname ${i + 1}`,
    gender: i % 2 === 0 ? '남' : '여',
    email: `member${i + 1}@example.com`,
    phone: `010-1234-56${String(i + 1).padStart(2, '0')}`,
    birthdate: '1980-01-01',
    position: '포지션',
    joinDate: '2024-07-15 17:39',
    lastLogin: '2일전(23회)',
    lastLoginIP: '192.168.0.1',
    activityLog: '활동 로그',
    points: '10,500P',
    totalPurchase: '2회 660,000원'
  })),
  blacklists: Array.from({ length: 50 }, (_, i) => ({
    name: `Blacklisted ${i + 1}`,
    nickname: `Nickname ${i + 1}`,
    gender: i % 2 === 0 ? '남' : '여',
    email: `blacklist${i + 1}@example.com`,
    phone: `010-9876-54${String(i + 1).padStart(2, '0')}`,
  })),
};

const MembersGeneral: React.FC = () => {
  const [membersPage, setMembersPage] = useState(1);
  const [blacklistPage, setBlacklistPage] = useState(1);
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [blacklistSearchTerm, setBlacklistSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const itemsPerPage = 10;

  const filterMembers = dummyData.members.filter(member =>
    member.name.includes(memberSearchTerm) ||
    member.nickname.includes(memberSearchTerm) ||
    member.email.includes(memberSearchTerm) ||
    member.phone.includes(memberSearchTerm)
  );
  const filterBlacklists = dummyData.blacklists.filter(member =>
    member.name.includes(blacklistSearchTerm) ||
    member.nickname.includes(blacklistSearchTerm) ||
    member.email.includes(blacklistSearchTerm) ||
    member.phone.includes(blacklistSearchTerm)
  );

  const members = filterMembers.slice((membersPage - 1) * itemsPerPage, membersPage * itemsPerPage);
  const blacklists = filterBlacklists.slice((blacklistPage - 1) * itemsPerPage, blacklistPage * itemsPerPage);

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const handleSaveMemo = () => {
    // 저장 로직을 여기에 추가하세요
    alert('메모가 저장되었습니다.');
  };

  const handleDeleteMember = () => {
    // 삭제 로직을 여기에 추가하세요
    alert('회원이 삭제되었습니다.');
  };

  return (
    <div className="members-general">
      <h1>일반회원</h1>
      <section className="section">
        <h2>회원 목록</h2>
        <SearchBar
          placeholder="회원 검색"
          value={memberSearchTerm}
          onChange={(e) => setMemberSearchTerm(e.target.value)}
        />
        <Table
          headers={['이름', '닉네임', '성별', '이메일', '연락처', '회원상세']}
          data={members}
          renderRow={(member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.nickname}</td>
              <td>{member.gender}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>
                <TextButton
                  text="회원상세"
                  color="gray"
                  onClick={() => setSelectedMember(member)}
                  type={2}
                />
              </td>
            </tr>
          )}
        />
        <Pagination currentPage={membersPage} totalPages={Math.ceil(filterMembers.length / itemsPerPage)} onPageChange={setMembersPage} />
      </section>
      <section className="section">
        <h2>블랙리스트</h2>
        <SearchBar
          placeholder="블랙리스트 검색"
          value={blacklistSearchTerm}
          onChange={(e) => setBlacklistSearchTerm(e.target.value)}
        />
        <Table
          headers={['이름', '닉네임', '성별', '이메일', '연락처', '회원상세']}
          data={blacklists}
          renderRow={(member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.nickname}</td>
              <td>{member.gender}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>
                <TextButton
                  text="회원상세"
                  color="gray"
                  onClick={() => setSelectedMember(member)}
                  type={2}
                />
              </td>
            </tr>
          )}
        />
        <Pagination currentPage={blacklistPage} totalPages={Math.ceil(filterBlacklists.length / itemsPerPage)} onPageChange={setBlacklistPage} />
      </section>
      <Modal 
        isOpen={!!selectedMember}
        onClose={handleCloseModal}
        onSubmit={handleSaveMemo}
        title={selectedMember ? selectedMember.name : ''}
      >
        {selectedMember && (
          <div className="modal-content-layout">
            <div className="modal-header-layout">
              <div className="member-photo">
                <TextButton
                  text="회원삭제"
                  color="black"
                  onClick={handleDeleteMember}
                  type={1}
                  style={{ position: 'absolute', top: '0', left: '0' }}
                />
                <img src="https://via.placeholder.com/100" alt="Member" />
                <div className="member-info">
                  <h2>{selectedMember.name}</h2>
                  <p>{selectedMember.nickname}</p>
                </div>
              </div>
              <div className="basic-info">
                <h3>기본정보</h3>
                <div className="info-row">
                  <div className="info-column">
                    <div className="info-item">
                      <p>닉네임</p>
                      <span>{selectedMember.nickname}</span>
                    </div>
                    <div className="info-item">
                      <p>이메일</p>
                      <span>{selectedMember.email}</span>
                    </div>
                    <div className="info-item">
                      <p>연락처</p>
                      <span>{selectedMember.phone}</span>
                    </div>
                  </div>
                  <div className="info-column">
                    <div className="info-item">
                      <p>성별</p>
                      <span>{selectedMember.gender}</span>
                    </div>
                    <div className="info-item">
                      <p>생년월일</p>
                      <span>{selectedMember.birthdate}</span>
                    </div>
                    <div className="info-item">
                      <p>포지션</p>
                      <span>{selectedMember.position}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body-layout">
              <div className="activity-log">
                <h3>활동내역</h3>
                <div className="info-row">
                  <div className="info-column">
                    <div className="info-item">
                      <p>가입일</p>
                      <span>{selectedMember.joinDate}</span>
                    </div>
                    <div className="info-item">
                      <p>로그인</p>
                      <span>{selectedMember.lastLogin}</span>
                    </div>
                  </div>
                  <div className="info-column">
                    <div className="info-item">
                      <p>보유 포인트</p>
                      <span>{selectedMember.points}</span>
                    </div>
                    <div className="info-item">
                      <p>누적 구매 금액</p>
                      <span>{selectedMember.totalPurchase}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="manager-memo">
                <h3>관리자 메모</h3>
                <textarea placeholder="관리자 메모 입력"></textarea>
                <TextButton
                  text="저장"
                  color="black"
                  onClick={handleSaveMemo}
                  type={1}
                  style={{ position: 'absolute', top: '0', right: '0' }}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MembersGeneral;
