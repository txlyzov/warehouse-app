import React from 'react';
import IconsSVG from './IconList.svg';

function Icon({ click, name, className, size }) {
    return (
        <svg onClick={click} className={`icon icon-${name} ${className ? className : ''}`} width={size} height={size}>
            <use xlinkHref={`${IconsSVG}#${name}`} />
        </svg>
    );
}

export default Icon;
