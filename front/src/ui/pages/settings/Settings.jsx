import './Settings.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { changeUserPassword } from '../../../services/AuthService';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { NoteModal } from '../../components/modal/modal-templates/modal-templates';
import SETTINGS from './Settings.dictionary';

function Settings() {
  const dispatch = useDispatch();
  const [issueCode, setIssueCode] = useState(SETTINGS.ERROR.CODE.OK);
  const [inputOldPassword, setInputOldPassword] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState('');
  const [inputConfirmNewPassword, setInputConfirmNewPassword] = useState('');
  const [inputOldPasswordIssue, setInputOldPasswordIssue] = useState(false);
  const [inputNewPasswordIssue, setInputNewPasswordIssue] = useState(false);
  const [inputConfirmNewPasswordIssue, setInputConfirmNewPasswordIssue] = useState(false);

  const navigate = useNavigate();
  const routeChange = (route) => {
    navigate(route);
  };

  const resetInputsValues = () => {
    setInputOldPassword('');
    setInputNewPassword('');
    setInputConfirmNewPassword('');
  };

  const resetInputsErrors = () => {
    setInputOldPasswordIssue(false);
    setInputNewPasswordIssue(false);
    setInputConfirmNewPasswordIssue(false);
    setIssueCode(SETTINGS.ERROR.CODE.OK);
  };

  const submitFunction = async () => {
    let issue = SETTINGS.ERROR.CODE.OK;
    resetInputsErrors();

    if (!inputOldPassword) {
      setInputOldPasswordIssue(true);
      issue = SETTINGS.ERROR.CODE.EMPTY_FIELDS;
    }

    if (!inputNewPassword) {
      setInputNewPasswordIssue(true);
      issue = SETTINGS.ERROR.CODE.EMPTY_FIELDS;
    }

    if (!inputConfirmNewPassword) {
      setInputConfirmNewPasswordIssue(true);
      issue = SETTINGS.ERROR.CODE.EMPTY_FIELDS;
    }

    if (issue !== SETTINGS.ERROR.CODE.OK) {
      setIssueCode(issue);
      return;
    }

    if (inputNewPassword !== inputConfirmNewPassword) {
      setInputNewPasswordIssue(true);
      setInputConfirmNewPasswordIssue(true);
      setIssueCode(SETTINGS.ERROR.CODE.NOT_EQUAL_CONFIRM_FIELD);
      return;
    }
    const requestResult = await changeUserPassword(inputOldPassword, inputNewPassword);
    if (requestResult.status !== 200) {
      if ((requestResult.response) && (requestResult.response.status === 400)) {
        setIssueCode(SETTINGS.ERROR.CODE.WRONG_ORIGINAL_PASSWORD);
        return
      }
      setIssueCode(SETTINGS.ERROR.CODE.UNKNOWN);
      return
    }

    dispatch(
      setModalContent(
        <NoteModal
          title={SETTINGS.MODAL.TITLE_NOTE}
          noteText={SETTINGS.MODAL.TEXT_NOTE}
        />
      )
    )
    resetInputsErrors();
    resetInputsValues();
  };

  return (
    <div className="settings wrapper">
      <div className="settings__form">
        <h2 className="settings__header">{SETTINGS.TEXTS.MAIN_TITLE}</h2>
        <hr className="settings__separator" />
        <h3 className="settings__prompt">{SETTINGS.TEXTS.PROMT_1}</h3>
        <Input
          data-testid={SETTINGS.INPUT.TEST_ID[0]}
          placeholder={SETTINGS.INPUT.PLACEHOLDER[0]}
          type="password"
          issue={inputOldPasswordIssue}
          closable
          className="settings__input-old-password"
          width="390px"
          inputValue={inputOldPassword}
          setInputValue={setInputOldPassword}
        />
        <Input
          data-testid={SETTINGS.INPUT.TEST_ID[1]}
          placeholder={SETTINGS.INPUT.PLACEHOLDER[1]}
          type="password"
          issue={inputNewPasswordIssue}
          closable
          className="settings__input-new-password"
          width="390px"
          inputValue={inputNewPassword}
          setInputValue={setInputNewPassword}
        />
        <Input
          data-testid={SETTINGS.INPUT.TEST_ID[2]}
          placeholder={SETTINGS.INPUT.PLACEHOLDER[2]}
          type="password"
          issue={inputConfirmNewPasswordIssue}
          closable
          className="settings__input-confirm"
          width="390px"
          inputValue={inputConfirmNewPassword}
          setInputValue={setInputConfirmNewPassword}
        />
        {issueCode !== SETTINGS.ERROR.CODE.OK
          ? <h3 className="settings__issue">{SETTINGS.ERROR.CONTENT[issueCode]}</h3>
          : ''}
        <div className={`settings__buttons-block ${issueCode !== -1 ? '' : 'settings__correct'}`}>
          <Button
            data-testid={SETTINGS.BUTTON.TEST_ID[0]}
            text={SETTINGS.BUTTON.TEXT[0]}
            click={() => routeChange('/home')}
            className="settings__forgot-password-button"
            type="secondary"
            size="md"
          />
          <Button
            data-testid={SETTINGS.BUTTON.TEST_ID[1]}
            text={SETTINGS.BUTTON.TEXT[1]}
            click={() => submitFunction()}
            className="settings__submit-button "
            type="primary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
