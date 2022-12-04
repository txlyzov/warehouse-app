import './ForgotPassword.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { EMAIL_REGEX } from '../../../utils/Constants';
import { resetUserPassword } from '../../../services/AuthService';
import FORGOT_PASSWORD from './ForgotPassword.dictionary';

function ForgotPassword() {
  const [issueCode, setIssueCode] = useState(FORGOT_PASSWORD.ERROR.CODE.OK);
  const [inputEmail, setInputEmail] = useState('');
  const [inputEmailIssue, setInputEmailIssue] = useState(false);

  const navigate = useNavigate();
  const routeChange = (route) => {
    navigate(route);
  };

  const resetInputsErrors = () => {
    setInputEmailIssue(false);
  };

  const submitFunction = async () => {
    let issue = FORGOT_PASSWORD.ERROR.CODE.OK;
    resetInputsErrors();

    if (!inputEmail) {
      setInputEmailIssue(true);
      issue = FORGOT_PASSWORD.ERROR.CODE.EMPTY_FIELDS;
    }

    if (issue !== FORGOT_PASSWORD.ERROR.CODE.OK) {
      setIssueCode(issue);
      return;
    }

    if (!EMAIL_REGEX.test(inputEmail)) {
      setInputEmailIssue(true);
      setIssueCode(FORGOT_PASSWORD.ERROR.CODE.EMAIL_VALIDATION);
      return;
    }

    const requestResult = await resetUserPassword(inputEmail);
    if (!requestResult) {
      setIssueCode(FORGOT_PASSWORD.ERROR.CODE.UNKNOWN);
      return
    }
    routeChange('/sign-in');
  };

  return (
    <div className="forgot-password wrapper">
      <div className="forgot-password__form">
        <h2 className="forgot-password__header">{FORGOT_PASSWORD.TEXTS.MAIN_TITLE}</h2>
        <hr className="forgot-password__separator" />
        <h3 className="forgot-password__prompt">{FORGOT_PASSWORD.TEXTS.PROMT_1}</h3>
        <Input
          data-testid={FORGOT_PASSWORD.INPUT.TEST_ID[0]}
          placeholder={FORGOT_PASSWORD.INPUT.PLACEHOLDER[0]}
          type="email"
          issue={inputEmailIssue}
          closable
          className="forgot-password__input-email"
          width="390px"
          inputValue={inputEmail}
          setInputValue={setInputEmail}
        />
        {issueCode !== FORGOT_PASSWORD.ERROR.CODE.OK
          ? FORGOT_PASSWORD.ERROR.CONTENT[issueCode]
          : ''}
        <Button
          data-testid={FORGOT_PASSWORD.BUTTON.TEST_ID[0]}
          text={FORGOT_PASSWORD.BUTTON.TEXT[0]}
          click={() => submitFunction()}
          className={`forgot-password__submit-button ${issueCode !== FORGOT_PASSWORD.ERROR.CODE.OK ? '' : 'forgot-password__correct'}`}
          type="primary"
          size="md"
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
