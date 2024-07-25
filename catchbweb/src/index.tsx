import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '@/App';

const container = document.getElementById('root');
const root = createRoot(container!); // !는 container가 null이 아님을 보장합니다.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
