import './modal-templates.scss'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetModal, setErrorCase, setModalContent, setModalTitle } from '../../../../redux-store/modal/ModalSlice';
import Button from '../../button/Button';
import Input from '../../input/Input';

export function ConfirmModal({ title = '', noteText = '', conformationValue = '', action }) {
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState('');
    const [inputIssue, setInputIssue] = useState(false);

    useEffect(() => {
        dispatch(setModalTitle(title))
    }, []);

    useEffect(() => {
        if (inputValue === conformationValue) {
            setInputIssue(false)
        }
    }, [inputValue]);

    const confirmAction = () => {
        if (conformationValue.toString() !== inputValue) {
            setInputIssue(true);
            return;
        }
        action();
        dispatch(setModalTitle(''));
        dispatch(setModalContent());
    }

    return (
        <div className='content confirm-modal'>
            <span className='content__text'>{noteText}</span>
            <div className='content__confirm-block'>
                <div
                    className={`content__key-field-block ${inputIssue ? 'issue' : ''}`}
                    aria-hidden="true"
                    onClick={() => { navigator.clipboard.writeText(conformationValue) }}
                >
                    <h4 className='content__key-field'>
                        {conformationValue}
                    </h4>
                </div>
                {inputIssue ?
                    <span className='content__equal-sign'>{'<=/=>'}</span>
                    :
                    <span className='content__equal-sign'>{'<===>'}</span>
                }
                <Input
                    className="content__confirm-input"
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    issue={inputIssue}
                />
            </div>
            {inputIssue ?
                <div className='content__issue-block'>
                    <h3 className='content__issue'>
                        Values do not match
                    </h3>
                </div>
                :
                ''
            }
            <Button
                click={() => {
                    confirmAction();
                }}
                className='content__close-button'
                text='Confirm'
                type="primary"
                size="md"
            />
        </div>
    );
}

function noteJSXPattern(className, title, text) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setModalTitle(title))
    }, []);

    return <div className={`content ${className}`}>
        <span className='content__text'>{text}</span>
        <Button
            click={() => dispatch(resetModal())}
            className='content__close-button'
            text='Confirm'
            type="primary"
            size="md"
        />
    </div>
}

export function NoteModal({ title = 'Note', noteText = 'Something' }) {
    return (
        noteJSXPattern('note-modal', title, noteText)
    )
}


export function ErrorModal({ title = 'Error', errorText = 'Unknown error' }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setErrorCase());
    }, []);

    return (
        noteJSXPattern('error-modal', title, errorText)
    )
}

export function InputModal({
    title = 'Input',
    noteText = 'Unknown error',
    inputValue,
    setInputValue,
    placeholder = null,
    notNull = false,
    notString = false,
    regexCheck = null
}) {
    const [modalInputValue, setModalInputValue] = useState(inputValue);
    const [inputIssue, setInputIssue] = useState({ issue: false, text: '' });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setModalTitle(title))
        // dispatch(setErrorCase());
    }, []);

    const closeModal = () => {
        if (notNull && modalInputValue.length === 0) {
            setInputIssue({ issue: true, text: 'Field must be not empty' });
            return
        }
        if (notString && !/^\d+$/g.test(modalInputValue)) {
            setInputIssue({ issue: true, text: 'Field must be not a string' });
            return
        }
        if (regexCheck && !regexCheck.test(modalInputValue)) {
            setInputIssue({ issue: true, text: 'Conditions failed' });
            return
        }
        setInputValue(modalInputValue)
        dispatch(resetModal())
    }

    return (
        <div className='content input-modal'>
            <h4 className='content__text'>{noteText}</h4>
            <Input
                placeholder={placeholder}
                className="content__value-input"
                setInputValue={setModalInputValue}
                inputValue={modalInputValue}
                issue={inputIssue}
            />
            {inputIssue.issue ?
                <div className='content__issue-block'>
                    <h3 className='content__issue'>
                        {inputIssue.text}
                    </h3>
                </div>
                :
                ''
            }
            <Button
                click={() => closeModal()}
                className='content__close-button'
                text='Apply changes'
                type="primary"
                size="md"
                disabled={inputValue === modalInputValue}
            />
        </div>
    )
}
