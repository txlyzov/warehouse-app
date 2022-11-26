import './ForgotPassword.scss';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { EMAIL_FRONT_REGEX, EMAIL_REGEX, AUTH } from '../../../utils/Constants';
import { resetUserPassword } from '../../../services/AuthService';

function ForgotPassword() {
  const errorTexts = {
    0: <h3 className="forgot-password__issue">Empty fields!</h3>,
    1: <h3 className="forgot-password__issue">Email should be like example@email.com</h3>,
    3: <h3 className="forgot-password__issue">
      Account does not exist. [
      <Link className="" to="/sign-up">Registration</Link>
      ]
    </h3>,
    6: <h3 className="forgot-password__issue">Unknown error(request failed).</h3>,
  };

  const [issueText, setIssueText] = useState(-1);
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
    let issue = AUTH.NO_ERROR;
    resetInputsErrors();

    if (!inputEmail) {
      setInputEmailIssue(true);
      issue = AUTH.ERROR_EMPTY_FIELS;
    }

    if (issue !== AUTH.NO_ERROR) {
      setIssueText(issue);
      return;
    }

    if (!EMAIL_REGEX.test(inputEmail)) {
      setInputEmailIssue(true);
      setIssueText(AUTH.ERROR_EMAIL_UNCORRECT);
      return;
    }

    const requestResult = await resetUserPassword(inputEmail);
    if (!requestResult) {
      setIssueText(AUTH.ERROR_REQUEST);
      return
    }
    routeChange('/sign-in');
  };

  return (
    <div className="forgot-password wrapper">
      <div className="forgot-password__form">
        <h2 className="forgot-password__header">Forgot password?</h2>
        <hr className="forgot-password__separator" />
        <h3 className="forgot-password__prompt">Type your account email here:</h3>
        <Input
          type="email"
          issue={inputEmailIssue}
          closable
          className="forgot-password__input-email"
          placeholder="Enter your email"
          width="390px"
          inputValue={inputEmail}
          setInputValue={setInputEmail}
        />
        {issueText !== -1
          ? errorTexts[issueText]
          : ''}
        <Button
          click={() => submitFunction()}
          className={`forgot-password__submit-button ${issueText !== -1 ? '' : 'forgot-password__correct'}`}
          text="Reset password"
          type="primary"
          size="md"
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
