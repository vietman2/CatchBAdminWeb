import React, { useState } from 'react';
import './OneToOne.css';
import SearchBar from '@components/SearchBar/SearchBar'; // SearchBar 컴포넌트 임포트
import TabPanel from '@components/Tabs/TabPanel'; // TabPanel 컴포넌트 임포트
import Pagination from '@components/Pagination/Pagination'; // Pagination 컴포넌트 임포트
import Table from '@components/Table/Table'; // Table 컴포넌트 임포트

const dummyInquiries = Array.from({ length: 50 }, (_, i) => ({
  inquiryId: `inquiry${i + 1}`,
  name: `User Name ${i + 1}`,
  academy: `Academy ${i + 1}`,
  inquiryContent: `Inquiry Content ${i + 1}`,
  inquiryDate: `2023-01-${i + 1 < 10 ? '0' : ''}${i + 1}`,
  status: i % 3 === 0 ? '미답변' : i % 3 === 1 ? '검토중' : '처리완료',
}));

const OneToOne: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('전체');

  const itemsPerPage = 10;

  const filteredInquiries = dummyInquiries.filter(inquiry => {
    if (filter === '전체') return true;
    return inquiry.status === filter;
  }).filter(inquiry =>
    inquiry.inquiryId.includes(searchTerm) ||
    inquiry.name.includes(searchTerm) ||
    inquiry.academy.includes(searchTerm) ||
    inquiry.inquiryContent.includes(searchTerm)
  );

  const inquiries = filteredInquiries.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getCountByStatus = (status: string) => {
    return dummyInquiries.filter(inquiry => inquiry.status === status).length;
  };

  const tabs = [
    { label: '전체', count: dummyInquiries.length },
    { label: '미답변', count: getCountByStatus('미답변') },
    { label: '검토중', count: getCountByStatus('검토중') },
    { label: '처리완료', count: getCountByStatus('처리완료') }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case '미답변':
        return 'status-incomplete';
      case '검토중':
        return 'status-review';
      case '처리완료':
        return 'status-complete';
      default:
        return '';
    }
  };

  return (
    <div className="one-to-one">
      <h1>1:1 문의 대응</h1>
      <h2>문의 목록</h2>
      <TabPanel 
        tabs={tabs} 
        activeTab={filter} 
        onTabClick={setFilter} 
      />
      <div className="header">
        <SearchBar
          placeholder="문의 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // 필요시 스타일 추가
        />
      </div>
      <Table
        headers={['문의 ID', '이름', '문의 아카데미명', '문의 내용', '문의 날짜', '처리상태']}
        data={inquiries}
        renderRow={(inquiry, index) => (
          <tr key={index}>
            <td>{inquiry.inquiryId}</td>
            <td>{inquiry.name}</td>
            <td>{inquiry.academy}</td>
            <td>{inquiry.inquiryContent}</td>
            <td>{inquiry.inquiryDate}</td>
            <td className={getStatusClass(inquiry.status)}>{inquiry.status}</td>
          </tr>
        )}
        emptyMessage="검색된 문의가 없습니다."
      />
      <Pagination 
        currentPage={page} 
        totalPages={Math.ceil(filteredInquiries.length / itemsPerPage)} 
        onPageChange={setPage} 
      />
    </div>
  );
};

export default OneToOne;
