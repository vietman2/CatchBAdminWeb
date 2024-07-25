import React from 'react';
import './CloseButton.css';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button className="close-button" onClick={onClick}>
      &times;
    </button>
  );
};

export default CloseButton;
