import './Settings.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { SETTINGS } from '../../../utils/Constants';
import { changeUserPassword, loginUser, registerNewUser } from '../../../services/AuthService';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { NoteModal } from '../../components/modal/modal-templates/modal-templates';

function Settings() {
  // eslint-disable-next-line max-len
  // let issueText = <h3 className="settings__issue">Account does not exist. [<Link className="" to="/">Registration</Link>]</h3>
  const errorTexts = {
    0: <h3 className="settings__issue">Empty fields!</h3>,
    1: <h3 className="settings__issue">Unknown error(request failed).</h3>,
    2: <h3 className="settings__issue">Wrong original password</h3>,
    3: <h3 className="settings__issue">Passwords not confirmed.</h3>,
  };

  const dispatch = useDispatch();
  const [issueText, setIssueText] = useState(-1);
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

  const resetInputsErrors = () => {
    setInputOldPasswordIssue(false);
    setInputNewPasswordIssue(false);
    setInputConfirmNewPasswordIssue(false);
  };

  const submitFunction = async () => {
    let issue = SETTINGS.NO_ERROR;
    resetInputsErrors();

    if (!inputOldPassword) {
      setInputOldPasswordIssue(true);
      issue = SETTINGS.ERROR_EMPTY_FIELS;
    }

    if (!inputNewPassword) {
      setInputNewPasswordIssue(true);
      issue = SETTINGS.ERROR_EMPTY_FIELS;
    }

    if (!inputConfirmNewPassword) {
      setInputConfirmNewPasswordIssue(true);
      issue = SETTINGS.ERROR_EMPTY_FIELS;
    }

    if (issue !== SETTINGS.NO_ERROR) {
      setIssueText(issue);
      return;
    }

    if (inputNewPassword !== inputConfirmNewPassword) {
      setInputNewPasswordIssue(true);
      setInputConfirmNewPasswordIssue(true);
      setIssueText(SETTINGS.ERROR_PASSWORD_NOT_EQUAL);
      return;
    }
    const requestResult = await changeUserPassword(inputOldPassword, inputNewPassword);
    if (requestResult.status !== 200) {
      if (requestResult.response.status === 400) {
        setIssueText(SETTINGS.ERROR_WRONG_OLD_PASSWORD);
        return
      }
      setIssueText(SETTINGS.ERROR_REQUEST);
      return
    }

    dispatch(
      setModalContent(
        <NoteModal
          title="Success!"
          noteText="Now you can use your new password."
        />
      )
    )
  };

  return (
    <div className="settings wrapper">
      <div className="settings__form">
        <h2 className="settings__header">Settings</h2>
        <hr className="settings__separator" />
        <h3 className="settings__prompt">Change password:</h3>
        <Input
          type="password"
          issue={inputOldPasswordIssue}
          closable
          className="settings__input-old-password"
          placeholder="Enter your old password"
          width="390px"
          inputValue={inputOldPassword}
          setInputValue={setInputOldPassword}
        />
        <Input
          type="password"
          issue={inputNewPasswordIssue}
          closable
          className="settings__input-new-password"
          placeholder="Enter your new password"
          width="390px"
          inputValue={inputNewPassword}
          setInputValue={setInputNewPassword}
        />
        <Input
          type="password"
          issue={inputConfirmNewPasswordIssue}
          closable
          className="settings__input-confirm"
          placeholder="Confirm your new password"
          width="390px"
          inputValue={inputConfirmNewPassword}
          setInputValue={setInputConfirmNewPassword}
        />
        {issueText !== -1
          ? errorTexts[issueText]
          : ''}
        <div className={`settings__buttons-block ${issueText !== -1 ? '' : 'settings__correct'}`}>
          <Button
            click={() => routeChange('/home')}
            className="settings__forgot-password-button"
            text="Return"
            type="secondary"
            size="md"
          />
          <Button
            click={() => submitFunction()}
            className="settings__submit-button "
            text="Update"
            type="primary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
