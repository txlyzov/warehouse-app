import './Button.scss';
import React from 'react';

function Button({
  click, type, size, text: children, className,
}) {
  return (
    <button type='button' onClick={click} className={`button button-${type || 'primary'} button-${size || 'md'} ${className}`}>
      {/* <div className="button-wrapper"> */}
      {children}
      {/* </div> */}
    </button>
  );
}

export default Button;
