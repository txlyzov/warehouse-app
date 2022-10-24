import './Checkbox.scss'
import React from 'react';

function Checkbox({ size, onChange, checked }) {
    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className='checkbox-block wrapper'>
            <input checked={checked || false} onChange={e => onChange(e.target.checked)} type="checkbox" className='checkbox-block__checkbox-basic' />
            <span className={`checkbox-block__checkbox-custom  ${size || 'checkbox-md'}`} />
        </label>
    );
}

export default Checkbox;
