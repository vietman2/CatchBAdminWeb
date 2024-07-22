import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import './Reservations.css';
import TextButton from './Buttons/TextButton';
import SearchBar from './SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트

// `Locale` 타입을 명시적으로 가져옴
import { Locale } from 'date-fns';
registerLocale('ko', ko as unknown as Locale);

interface Member {
  name: string;
  nickname: string;
  birthdate: string;
  phone: string;
}

interface Reservation {
  name: string;
  academy: string;
  item: string;
  date: string;
  status: string;
}

const dummyData = {
  members: [
    { name: '홍길동', nickname: '프로는무슨코딩중', birthdate: '900913', phone: '010-1111-1111' },
    { name: '이두희', nickname: '두희두휫츄', birthdate: '841216', phone: '010-2222-2222' },
    { name: '홍길동', nickname: '두희야슬리퍼신지마라', birthdate: '880721', phone: '010-4444-4444' },
    { name: '정길동', nickname: '두희슬리퍼비거리150', birthdate: '910811', phone: '010-1111-1111' },
  ],
  reservations: [
    { name: '홍길동', academy: 'Catch B 아카데미', item: '사회인야구 1:1 투수레슨 / 10회권', date: '2024-06-30', status: '이용 전' },
    { name: '홍길동', academy: 'Catch B 아카데미', item: '사회인야구 1:1 투수레슨 / 10회권', date: '2024-04-30', status: '이용 중' },
    { name: '홍길동', academy: 'Catch B 아카데미', item: '사회인야구 1:1 투수레슨 / 10회권', date: '2024-02-21', status: '이용완료' },
    { name: '홍길동', academy: 'Catch B 아카데미', item: '사회인야구 1:1 투수레슨 / 10회권', date: '2023-12-19', status: '이용완료' },
  ],
};

const Reservations: React.FC = () => {
  const [searchName, setSearchName] = useState('');
  const [searchBirthdate, setSearchBirthdate] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const fontSize = 22;

  const filteredMembers = dummyData.members.filter(member =>
    member.name.includes(searchName) &&
    member.birthdate.includes(searchBirthdate) &&
    member.phone.includes(searchPhone)
  );

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    setSelectedReservation(null);
  };

  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
    setActiveReservation(null); // 초기화
  };

  const handleCancelClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsCancelModalOpen(true);
    setActiveReservation(null); // 초기화
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsCancelModalOpen(false);
    setSelectedReservation(null);
    setActiveReservation(null);
  };

  const handleToggleReservation = (reservation: Reservation) => {
    if (activeReservation && activeReservation.date === reservation.date) {
      setActiveReservation(null);
    } else {
      setActiveReservation(reservation);
    }
  };

  const times = {
    오전: ['10:00', '10:30', '11:00', '11:30'],
    오후: ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30']
  };

  return (
    <div className="reservations">
      <h1>예약관리</h1>
      <section className="section">
        <h2>회원 검색</h2>
        <div>
          <SearchBar placeholder="이름" value={searchName} onChange={(e) => setSearchName(e.target.value)} style={{marginRight: '10px'}} />
          <SearchBar placeholder="생년월일" value={searchBirthdate} onChange={(e) => setSearchBirthdate(e.target.value)} style={{marginRight: '10px'}} />
          <SearchBar placeholder="연락처" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} />
        </div>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>닉네임</th>
              <th>생년월일</th>
              <th>연락처</th>
            </tr>
          </thead>
          <tbody>
            {(searchName || searchBirthdate || searchPhone) ? (
              filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <tr key={index} onClick={() => handleMemberClick(member)}>
                    <td>{member.name}</td>
                    <td>{member.nickname}</td>
                    <td>{member.birthdate}</td>
                    <td>{member.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>검색된 회원이 없습니다.</td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={4}>회원 검색 후 결과가 여기에 표시됩니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {selectedMember && (
        <section className="section">
          <h2>{selectedMember.name}님 예약 목록</h2>
          <table>
            <thead>
              <tr>
                <th>예약자명</th>
                <th>아카데미명</th>
                <th>구매항목</th>
                <th>구매일</th>
                <th>이용 상태</th>
                <th>변경 및 취소</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.reservations
                .filter(reservation => reservation.name === selectedMember.name)
                .map((reservation, index) => (
                  <tr key={index}>
                    <td>{reservation.name}</td>
                    <td>{reservation.academy}</td>
                    <td>{reservation.item}</td>
                    <td>{reservation.date}</td>
                    <td className={reservation.status === '이용 전' ? 'status-before-use' : reservation.status === '이용 중' ? 'status-using' : 'status-complete'}>
                      {reservation.status}
                    </td>
                    <td>
                      {reservation.status !== '이용완료' ? (
                        <>
                          <TextButton
                            text="변경"
                            color="gray"
                            onClick={() => handleReservationClick(reservation)}
                            type={2}
                            style={{ marginRight: '10px' }}
                          />
                          <TextButton
                            text="취소"
                            color="gray"
                            onClick={() => handleCancelClick(reservation)}
                            type={2}
                          />
                        </>
                      ) : (
                        <span className="not-allowed">변경불가</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      )}

      {selectedReservation && (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="예약 변경">
          <div className="modal-content">
            <h2>{selectedReservation.academy}</h2>
            <p>이용 중인 프로그램명: <span>{selectedReservation.item}</span></p>
            <h3 style={{ fontSize: `${fontSize}px` }}>예약 내역</h3>
            <table>
              <thead>
                <tr>
                  <th>예약일</th>
                  <th>예약시간</th>
                  <th>변경 가능 여부</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.reservations.filter(reservation => 
                  !activeReservation || reservation.date === activeReservation?.date
                ).map((reservation, index) => (
                  reservation.status === '이용완료' ? (
                    <tr key={index}>
                      <td>{reservation.date}</td>
                      <td>오후 7시 - 오후 9시</td>
                      <td className="status-complete">변경불가</td>
                    </tr>
                  ) : (
                    <tr
                      key={index}
                      onClick={() => handleToggleReservation(reservation)}
                      className={activeReservation?.date === reservation.date ? 'active' : ''}
                    >
                      <td>{reservation.date}</td>
                      <td>오후 7시 - 오후 9시</td>
                      <td className="status-using">변경가능</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
            {activeReservation && (
              <>
                <div className="date-time-selection">
                  <div className="calendar-container">
                    <h3 style={{ fontSize: `${fontSize}px` }}>예약 날짜 선택</h3>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: Date | null) => setSelectedDate(date)}
                      dateFormat="yyyy-MM-dd"
                      locale="ko"
                      inline
                      calendarClassName="custom-calendar"
                    />
                  </div>
                  <div className="time-slot-container">
                    <h3 style={{ fontSize: `${fontSize}px` }}>예약 시간 선택</h3>
                    <div className="time-slots">
                      {Object.entries(times).map(([session, slots], index) => (
                        <div key={index} className="session">
                          <h4 style={{ fontSize: `${fontSize}px` }}>{session}</h4>
                          <div className="slot-row">
                            {slots.map((time) => (
                              <button
                                key={time}
                                className={selectedTime === time ? 'selected' : ''}
                                onClick={() => setSelectedTime(time)}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="confirm-button" onClick={closeModal}>변경요청</button>
                <button className="finalize-button" onClick={closeModal}>변경확정</button>
              </>
            )}
            <button className="close-button" onClick={closeModal}>닫기</button>
          </div>
        </Modal>
      )}

      {selectedReservation && (
        <Modal isOpen={isCancelModalOpen} onRequestClose={closeModal} contentLabel="예약 취소">
          <div className="modal-content">
            <h2>{selectedReservation.academy}</h2>
            <p>이용 중인 프로그램명: <span>{selectedReservation.item}</span></p>
            <h3 style={{ fontSize: `${fontSize}px` }}>예약 내역</h3>
            <table>
              <thead>
                <tr>
                  <th>예약일</th>
                  <th>예약시간</th>
                  <th>변경 가능 여부</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.reservations.filter(reservation => 
                  !activeReservation || reservation.date === activeReservation?.date
                ).map((reservation, index) => (
                  reservation.status === '이용완료' ? (
                    <tr key={index}>
                      <td>{reservation.date}</td>
                      <td>오후 7시 - 오후 9시</td>
                      <td className="status-complete">변경불가</td>
                    </tr>
                  ) : (
                    <tr
                      key={index}
                      onClick={() => handleToggleReservation(reservation)}
                      className={activeReservation?.date === reservation.date ? 'active' : ''}
                    >
                      <td>{reservation.date}</td>
                      <td>오후 7시 - 오후 9시</td>
                      <td className="status-using" style={{ color: '#FF5833' }}>취소가능</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
            {activeReservation && (
              <>
                <button className="confirm-button" onClick={closeModal}>취소요청</button>
                <button className="finalize-button" onClick={closeModal}>취소확정</button>
              </>
            )}
            <button className="close-button" onClick={closeModal}>닫기</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Reservations;
