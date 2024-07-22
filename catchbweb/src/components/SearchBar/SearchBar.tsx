// components/SearchBar.tsx
import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties; // 추가적인 스타일을 받을 수 있도록 설정
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange, style }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="search-input"
      style={style} // 스타일 적용
    />
  );
};

export default SearchBar;
