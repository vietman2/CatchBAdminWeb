import React from 'react';
import './TextButton.css';

interface Props {
    type?: 1 | 2;
    text: string;
    color: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties; // 추가적인 스타일을 받을 수 있도록 설정
}

const TextButton: React.FC<Props> = ({ type = 1, text, color, onClick, style }) => {
    if (type === 1) {
    return (
        <button className="text-button1" onClick={onClick} style={{ backgroundColor: color, ...style }}>
            {text}
        </button>
    );}
    if (type === 2) {
    return (
        <button className="text-button2" onClick={onClick} style={{ borderColor: color, color: color, ...style }}>
            {text}
        </button>
    );}
    else {
        return null;
    }
};

export default TextButton;
