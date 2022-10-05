import './Button.scss';
import React from 'react';

function Button({
  click, type, size, text: children, className,
}) {
  return (
    <div className="button-wrapper ">
      <button type='button' onClick={click} className={`button button-${type || 'primary'} button-${size || 'md'} ${className}`}>
        {children}
      </button>
    </div>
  );
}

export default Button;
