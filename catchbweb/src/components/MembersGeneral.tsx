import React, { useState } from 'react';
import './MembersGeneral.css';
import TextButton from './Buttons/TextButton';
import SearchBar from './SearchBar/SearchBar';

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
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>닉네임</th>
              <th>성별</th>
              <th>이메일</th>
              <th>연락처</th>
              <th>회원상세</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
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
            ))}
          </tbody>
        </table>
        <Pagination currentPage={membersPage} totalPages={Math.ceil(filterMembers.length / itemsPerPage)} onPageChange={setMembersPage} />
      </section>
      <section className="section">
        <h2>블랙리스트</h2>
        <SearchBar
          placeholder="블랙리스트 검색"
          value={blacklistSearchTerm}
          onChange={(e) => setBlacklistSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>닉네임</th>
              <th>성별</th>
              <th>이메일</th>
              <th>연락처</th>
              <th>회원상세</th>
            </tr>
          </thead>
          <tbody>
            {blacklists.map((member, index) => (
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
            ))}
          </tbody>
        </table>
        <Pagination currentPage={blacklistPage} totalPages={Math.ceil(filterBlacklists.length / itemsPerPage)} onPageChange={setBlacklistPage} />
      </section>
      {selectedMember && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <button className="member-delete-button">회원삭제</button>
              <div className="modal-header">
                <div className="member-photo">
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
              <div className="modal-body">
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
                  <button className="save-button" onClick={handleSaveMemo}>저장</button>
                </div>
              </div>
              <button className="close-button" onClick={handleCloseModal}>닫기</button>
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

export default MembersGeneral;
