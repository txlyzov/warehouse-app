import "./Icon.scss"
import React from 'react';
import IconsSVG from './IconList.svg';

function Icon({ hoverable, click, name, className, size, backgroundColor, color }) {
    backgroundColor = backgroundColor ? backgroundColor : "transparent"
    color = color ? color : ""
    return (
        <svg style={{ backgroundColor }}
            onClick={click}
            className={`icon icon-${name} ${className ? className : ''} ${hoverable ? 'hoverable' : ''}`}
            width={size}
            height={size}>
            <use xlinkHref={`${IconsSVG}#${name}`} />
        </svg>
    );
}

export default Icon;
