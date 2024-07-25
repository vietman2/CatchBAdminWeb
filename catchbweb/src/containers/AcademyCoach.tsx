import React, { useState } from 'react';
import './AcademyCoach.css';
import TextButton from '@components/Buttons/TextButton';
import SearchBar from '@components/SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트
import Pagination from '@components/Pagination/Pagination'; // Pagination 컴포넌트 임포트
import Table from '@components/Table/Table'; // Table 컴포넌트 임포트

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
        <Table
          headers={['구분', '이름', '연락처', '요청일', '업로드 항목', '승인여부']}
          data={dummyData.registrationRequests}
          renderRow={(request, index) => (
            <tr key={index}>
              <td>{request.type}</td>
              <td>{request.name}</td>
              <td>{request.phone}</td>
              <td>{request.date}</td>
              <td>{request.file}</td>
              <td>
                <TextButton text="등록거절" color="orange" onClick={() => {}} type={2} style={{ marginRight: '10px' }} />
                <TextButton text="등록승인" color="black" onClick={() => {}} type={2} />
              </td>
            </tr>
          )}
        />
      </section>

      <section className="section">
        <h2>아카데미 목록</h2>
        <SearchBar
          placeholder="아카데미 검색"
          value={academySearchTerm}
          onChange={e => setAcademySearchTerm(e.target.value)}
        />
        <Table
          headers={['아카데미 명', '사업자등록번호', '주소', '시설 연락처', '대표자 연락처', '사업자등록증', '삭제']}
          data={filteredAcademies}
          renderRow={(academy, index) => (
            <tr key={index}>
              <td>{academy.name}</td>
              <td>{academy.regNumber}</td>
              <td>{academy.address}</td>
              <td>{academy.phone}</td>
              <td>{academy.contact}</td>
              <td>{academy.file}</td>
              <td><TextButton text="삭제" color="red" onClick={() => {}} type={2} /></td>
            </tr>
          )}
        />
        <Pagination currentPage={academyPage} totalPages={Math.ceil(dummyData.academies.length / itemsPerPage)} onPageChange={setAcademyPage} />
      </section>

      <section className="section">
        <h2>코치 목록</h2>
        <SearchBar
          placeholder="코치 검색"
          value={coachSearchTerm}
          onChange={e => setCoachSearchTerm(e.target.value)}
        />
        <Table
          headers={['이름', '소속 아카데미 명', '주소', '연락처', '증빙서류', '삭제']}
          data={filteredCoaches}
          renderRow={(coach, index) => (
            <tr key={index}>
              <td>{coach.name}</td>
              <td>{coach.academy}</td>
              <td>{coach.address}</td>
              <td>{coach.phone}</td>
              <td>{coach.file}</td>
              <td><TextButton text="삭제" color="red" onClick={() => {}} type={2} /></td>
            </tr>
          )}
        />
        <Pagination currentPage={coachPage} totalPages={Math.ceil(dummyData.coaches.length / itemsPerPage)} onPageChange={setCoachPage} />
      </section>
    </div>
  );
};

export default AcademyCoach;
