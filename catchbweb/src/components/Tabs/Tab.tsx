// components/Tabs/Tab.tsx
import React from 'react';
import './Tab.css'; // 스타일 파일

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick, count }) => {
  return (
    <div className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
      {label} {count !== undefined && <span>{count}</span>}
    </div>
  );
};

export default Tab;
