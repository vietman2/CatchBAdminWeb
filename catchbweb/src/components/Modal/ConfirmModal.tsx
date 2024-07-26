import React from 'react';
import './ConfirmModal.css';
import ModalButton from '@components/Buttons/ModalButton'; // ModalButton 컴포넌트 임포트

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  details: string; // 간단한 정보를 전달하기 위한 속성 추가
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message, details }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <h2>확인</h2>
        <p>{details}</p> {/* 간단한 정보 표시 */}
        <p>{message}</p>
        <div className="confirm-modal-buttons">
          <ModalButton text="취소" color="gray" onClick={onClose} style={{ fontSize: '14px' }}/>
          <ModalButton text="확인" color="red" onClick={onConfirm} style={{ marginLeft: '10px', fontSize: '14px' }} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
