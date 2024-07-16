import React, { useState } from 'react';
import './AcademyCoach.css';

const generateDummyData = (count: number, type: 'academy' | 'coach') => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    if (type === 'academy') {
      data.push({
        name: `Academy ${i}`,
        regNumber: `000-00-000${i}`,
        address: `Sample Address ${i}`,
        phone: `010-1234-56${i.toString().padStart(2, '0')}`,
        contact: `010-0000-00${i.toString().padStart(2, '0')}`,
        file: `file${i}.jpg`
      });
    } else if (type === 'coach') {
      data.push({
        name: `Coach ${i}`,
        academy: `Academy ${Math.ceil(i / 10)}`,
        address: `Sample Address ${i}`,
        phone: `010-1234-56${i.toString().padStart(2, '0')}`,
        file: `file${i}.pdf`
      });
    }
  }
  return data;
};

const dummyData = {
  registrationRequests: [
    { type: '아카데미', name: 'Catch B Academy', phone: '010-2345-6789', date: '2024-07-04', file: '사업자등록증.jpg', status: '등록대기' },
    { type: '아카데미', name: 'FXXK B Academy', phone: '010-5678-9012', date: '2024-07-04', file: '사업자등록증.jpg', status: '등록대기' },
    { type: '코치', name: '홍길동', phone: '010-9876-5432', date: '2024-07-04', file: '선수등록확인서.pdf', status: '등록대기' },
    // ... 더미 데이터 추가
  ],
  academies: generateDummyData(50, 'academy'),
  coaches: generateDummyData(50, 'coach')
};

const AcademyCoach: React.FC = () => {
  const [academySearchTerm, setAcademySearchTerm] = useState('');
  const [coachSearchTerm, setCoachSearchTerm] = useState('');
  const [academyPage, setAcademyPage] = useState(1);
  const [coachPage, setCoachPage] = useState(1);

  const itemsPerPage = 10;

  const filteredAcademies = dummyData.academies.filter(academy =>
    academy.name.toLowerCase().includes(academySearchTerm.toLowerCase())
  ).slice((academyPage - 1) * itemsPerPage, academyPage * itemsPerPage);

  const filteredCoaches = dummyData.coaches.filter(coach =>
    coach.name.toLowerCase().includes(coachSearchTerm.toLowerCase())
  ).slice((coachPage - 1) * itemsPerPage, coachPage * itemsPerPage);

  return (
    <div className="academy-coach">
      <h1>아카데미 및 코치관리</h1>

      <section className="section">
        <h2>등록요청</h2>
        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>이름</th>
              <th>연락처</th>
              <th>요청일</th>
              <th>업로드 항목</th>
              <th>승인여부</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.registrationRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.type}</td>
                <td>{request.name}</td>
                <td>{request.phone}</td>
                <td>{request.date}</td>
                <td>{request.file}</td>
                <td>
                  <button className="reject-button">등록거절</button>
                  <button className="approve-button">등록승인</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>아카데미 목록</h2>
        <input
          type="text"
          placeholder="아카데미 검색"
          value={academySearchTerm}
          onChange={e => setAcademySearchTerm(e.target.value)}
          className="search-input"
        />
        <table>
          <thead>
            <tr>
              <th>아카데미 명</th>
              <th>사업자등록번호</th>
              <th>주소</th>
              <th>시설 연락처</th>
              <th>대표자 연락처</th>
              <th>사업자등록증</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {filteredAcademies.map((academy, index) => (
              <tr key={index}>
                <td>{academy.name}</td>
                <td>{academy.regNumber}</td>
                <td>{academy.address}</td>
                <td>{academy.phone}</td>
                <td>{academy.contact}</td>
                <td>{academy.file}</td>
                <td><button className="delete-button">삭제</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={academyPage} totalPages={Math.ceil(dummyData.academies.length / itemsPerPage)} onPageChange={setAcademyPage} />
      </section>

      <section className="section">
        <h2>코치 목록</h2>
        <input
          type="text"
          placeholder="코치 검색"
          value={coachSearchTerm}
          onChange={e => setCoachSearchTerm(e.target.value)}
          className="search-input"
        />
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>소속 아카데미 명</th>
              <th>주소</th>
              <th>연락처</th>
              <th>증빙서류</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoaches.map((coach, index) => (
              <tr key={index}>
                <td>{coach.name}</td>
                <td>{coach.academy}</td>
                <td>{coach.address}</td>
                <td>{coach.phone}</td>
                <td>{coach.file}</td>
                <td><button className="delete-button">삭제</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={coachPage} totalPages={Math.ceil(dummyData.coaches.length / itemsPerPage)} onPageChange={setCoachPage} />
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

export default AcademyCoach;
