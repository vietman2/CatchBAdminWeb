import React, { useState } from 'react';
import './MembersGeneral.css';

const dummyData = {
  members: Array.from({ length: 50 }, (_, i) => ({
    name: `Member ${i + 1}`,
    nickname: `Nickname ${i + 1}`,
    gender: i % 2 === 0 ? '남' : '여',
    email: `member${i + 1}@example.com`,
    phone: `010-1234-56${String(i + 1).padStart(2, '0')}`,
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

  return (
    <div className="members-general">
      <h1>일반회원</h1>

      <section className="section">
        <h2>회원 목록</h2>
        <input
          type="text"
          placeholder="회원 검색"
          value={memberSearchTerm}
          onChange={(e) => setMemberSearchTerm(e.target.value)}
          className="search-input"
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
                <td><button className="details-button">회원상세</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={membersPage} totalPages={Math.ceil(filterMembers.length / itemsPerPage)} onPageChange={setMembersPage} />
      </section>

      <section className="section">
        <h2>블랙리스트</h2>
        <input
          type="text"
          placeholder="블랙리스트 검색"
          value={blacklistSearchTerm}
          onChange={(e) => setBlacklistSearchTerm(e.target.value)}
          className="search-input"
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
                <td><button className="details-button">회원상세</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={blacklistPage} totalPages={Math.ceil(filterBlacklists.length / itemsPerPage)} onPageChange={setBlacklistPage} />
      </section>
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
