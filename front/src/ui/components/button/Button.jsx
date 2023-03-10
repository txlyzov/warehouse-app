import './Button.scss';
import React from 'react';

function Button({
  click, type, size, text: children, className, disabled = false, ...props
}) {
  return (
    <button
      {...props}
      disabled={disabled}
      type='button'
      onClick={click}
      className={`button 
                  button-${type || 'primary'} 
                  button-${size || 'md'} 
                  ${className} 
                  ${disabled ? 'disabled' : ''}`}
    >
      {children}
    </button>
  );
}

export default Button;
