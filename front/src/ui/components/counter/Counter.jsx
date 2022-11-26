import './Counter.scss';
import React, { useEffect, useState } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';

function Counter({ className, size, inputCurrentValue = 1, outputCurrentPage }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(inputCurrentValue);
    const [counterValue, setCounterValue] = useState(inputCurrentValue);

    const submitInputFunction = (event) => {
        if (event.key === 'Enter') {
            setIsEditMode(false);
        }
    };

    const changeValue = (value) => {
        outputCurrentPage(value);
        setCounterValue(value);
    }

    useEffect(() => {
        document.addEventListener('keydown', submitInputFunction);
    }, []);

    useEffect(() => {
        if (!isEditMode) {
            if (inputValue.length !== 0) {
                if (inputValue < 0) {
                    changeValue(0);
                }
                if (inputValue >= 0) {
                    changeValue(parseInt(inputValue, 10));
                }
            }
        } else {
            setInputValue(counterValue)
        }
    }, [isEditMode]);

    return (
        <div className={`counter wrapper counter-${size || 'md'} ${className}`}>
            <Button click={counterValue > 0 ? () => changeValue(counterValue - 1) : null} className='counter__to-prev' type='secondary' size='ssm' text="-" />
            <div className='counter__middle-block' onDoubleClick={() => setIsEditMode(true)}>
                {isEditMode === true ?
                    <div className='counter__edit-block'>
                        <h4 className='counter__text'>
                            Items left:
                        </h4>
                        <Input inputValue={inputValue} setInputValue={setInputValue} className="counter__input" />
                    </div>
                    : <div className="counter__value-number">
                        <h4 className='counter__text'>Items left:</h4>
                        <h4 className='counter__text'>{counterValue}</h4>
                    </div>}
            </div>
            <Button click={() => changeValue(counterValue + 1)} className='counter__to-next' type='secondary' size='ssm' text="+" />
        </div>
    );
}

export default Counter;
