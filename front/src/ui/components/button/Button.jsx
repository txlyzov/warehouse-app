import "./Button.scss"
import React from 'react';

function Button({ click, type, size, text: children, className }) {
    return (
        <div className="button-wrapper ">
            <button onClick={click} className={`button button-${type ? type : 'primary'} button-${size ? size : 'md'} ${className}`}>{children}
            </button>
        </div>
    );
}

export default Button;
