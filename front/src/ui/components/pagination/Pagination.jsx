import './Pagination.scss';
import React, { useEffect, useState } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';

function Pagination({ inputCurrentPage = 1, totalPages = 1, size, className, outputCurrentPage }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(inputCurrentPage);
    const [currentPage, setCurrentPage] = useState(inputCurrentPage);

    const submitInputFunction = (event) => {
        if (event.key === 'Enter') {
            setIsEditMode(false);
        }
    };

    const changePage = (value) => {
        outputCurrentPage(value)
        setCurrentPage(value);
    }

    useEffect(() => {
        document.addEventListener('keydown', submitInputFunction);
    }, []);

    useEffect(() => {
        if (!isEditMode) {
            if (inputValue.length !== 0) {
                if (inputValue > totalPages) {
                    changePage(totalPages);
                }
                if (inputValue < 1) {
                    changePage(1);
                }
                if (inputValue >= 1 && inputValue <= totalPages) {
                    changePage(parseInt(inputValue, 10));
                }
            }
        } else {
            setInputValue(currentPage)
        }
    }, [isEditMode]);

    useEffect(() => {
        setCurrentPage(1)
    }, [totalPages]);

    return (
        <div className={`pagination wrapper pagination-${size || 'md'} ${className}`}>
            <Button click={currentPage === 1 ? null : () => changePage(1)} className='pagination__to-first' type='primary' size='ssm' text="<<" />
            <Button click={currentPage > 1 ? () => changePage(currentPage - 1) : null} className='pagination__to-prev' type='secondary' size='ssm' text="<" />
            <div className='pagination__middle-block' onDoubleClick={() => setIsEditMode(true)}>
                {isEditMode === true ?
                    <div className='pagination__edit-block'>
                        <Input inputValue={inputValue} setInputValue={setInputValue} className="pagination__input" />
                        <span className='pagination__page-number'>
                            {totalPages}
                        </span>
                    </div>
                    : <span className="pagination__page-number">
                        {currentPage} / {totalPages}
                    </span>}
            </div>
            <Button click={currentPage < totalPages ? () => changePage(currentPage + 1) : null} className='pagination__to-next' type='secondary' size='ssm' text=">" />
            <Button click={currentPage === totalPages ? null : () => changePage(totalPages)} className='pagination__to-last' type='primary' size='ssm' text=">>" />
        </div>
    );
}

export default Pagination;
