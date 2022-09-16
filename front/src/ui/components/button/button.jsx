import "./button.scss"
import React from 'react';

function Button({ click, type, size, text }) {
    return (
        <div className="button-wrapper ">
            <button onClick={click} className={`button-${type} button-${size}`}>{text}
            </button>
        </div>
    );
}

export default Button;
