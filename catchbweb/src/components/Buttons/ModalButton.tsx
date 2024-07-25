import React from 'react';
import './ModalButton.css';

interface Props {
    text: string;
    color: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties; // 추가적인 스타일을 받을 수 있도록 설정
}

const ModalButton: React.FC<Props> = ({ text, color, onClick, style }) => {
    return (
        <button className="modal-text-button1" onClick={onClick} style={{ backgroundColor: color, ...style }}>
            {text}
        </button>
    );
};

export default ModalButton;
