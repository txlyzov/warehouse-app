import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalTitle, setModalContent, setModalTitle } from '../../../redux-store/modal/ModalSlice';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import './modal.scss';

export default function Modal({
  active,
  children,
}) {
  const dispatch = useDispatch();
  const title = useSelector(selectModalTitle);

  const closeModal = () => {
    dispatch(setModalTitle(''));
    dispatch(setModalContent());
  };

  const escFunction = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
  }, []);

  return (
    <div
      className={active ? 'modal active' : 'modal'}
    >
      <div
        className={active ? 'modal__content active' : 'modal-content'}
      >
        <div className="modal__container">
          <div className="modal__header">
            {/* <Button
              size="ssm"
              type="secondary"
              className="modal__close-button"
              click={() => closeModal()}
              text={(
                <Icon
                  name="close"
                  size="22px"
                  className="input-block__close-icon close-icon-bs"
                />
              )}
            /> */}
            <span className="modal__title">{title}</span>
            <Button
              click={() => closeModal()}
              className='modal__close-button'
              text={(
                <Icon
                  name="close"
                  size="22px"
                  className="modal__close-icon"
                />
              )}
              type="secondary"
              size="ssm"
            />
          </div>
          <div className="modal__content">
            {children}
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        role="button"
        onClick={() => closeModal()}
        className="modal__outside"
      >
        transparent
      </div>
    </div>
  );
}
