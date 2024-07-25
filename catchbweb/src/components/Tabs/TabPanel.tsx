// components/Tabs/TabPanel.tsx
import React from 'react';
import Tab from './Tab';
import './TabPanel.css'; // 스타일 파일

interface TabPanelProps {
  tabs: { label: string; count?: number }[];
  activeTab: string;
  onTabClick: (label: string) => void;
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="tab-panel">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          isActive={activeTab === tab.label}
          onClick={() => onTabClick(tab.label)}
          count={tab.count}
        />
      ))}
    </div>
  );
};

export default TabPanel;
