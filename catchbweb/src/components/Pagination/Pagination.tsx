import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
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

export default Pagination;
