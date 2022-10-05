import './SignIn.scss';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { loginUser } from '../../../services/AuthService';
import { EMAIL_FRONT_REGEX, EMAIL_REGEX, AUTH } from '../../../utils/Constants';

function SignIn() {
  const errorTexts = {
    0: <h3 className="sign-in__issue">Empty fields!</h3>,
    1: <h3 className="sign-in__issue">Email should be like example@email.com</h3>,
    3: <h3 className="sign-in__issue">
      Account does not exist. [
      <Link className="" to="/sign-up">Registration</Link>
      ]
      {/* eslint-disable-next-line react/jsx-indent */}
       </h3>,
    5: <h3 className="sign-in__issue">
      Wrong password. [
      <Link className="" to="/forgot-password">Reset password</Link>
      ]
      {/* eslint-disable-next-line react/jsx-indent */}
       </h3>,
    6: <h3 className="sign-in__issue">Unknown error</h3>,
  };

  const [issueText, setIssueText] = useState(-1);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputEmailIssue, setInputEmailIssue] = useState(false);
  const [inputPasswordIssue, setInputPasswordIssue] = useState(false);

  const navigate = useNavigate();
  const routeChange = (route) => {
    navigate(route);
  };

  const resetInputsErrors = () => {
    setInputEmailIssue(false);
    setInputPasswordIssue(false);
  };

  const submitFunction = () => {
    let issue = AUTH.NO_ERROR;
    resetInputsErrors();

    if (!inputEmail) {
      setInputEmailIssue(true);
      issue = AUTH.ERROR_EMPTY_FIELS;
    }

    if (!inputPassword) {
      setInputPasswordIssue(true);
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
    const requestResult = loginUser(inputEmail, inputPassword);
    // if (!requestResult) {
    //     setIssueText(errorRequest);
    //     return
    // }
    const token = 'anytoken';
    const username = inputEmail.match(EMAIL_FRONT_REGEX)[0];
    localStorage.setItem('loginData', JSON.stringify({ username, token }));
    routeChange('/home');
  };

  return (
    <div className="sign-in wrapper">
      <div className="sign-in__form">
        <h2 className="sign-in__header">Sign in</h2>
        <hr className="sign-in__separator" />
        <h3 className="sign-in__prompt">Type your account email here:</h3>
        <Input
          type="email"
          issue={inputEmailIssue}
          closable
          className="sign-in__input-email"
          placeholder="Enter your email"
          width="390px"
          inputValue={inputEmail}
          setInputValue={setInputEmail}
        />
        <h3 className="sign-in__prompt">Type your password here:</h3>
        <Input
          type="password"
          issue={inputPasswordIssue}
          closable
          className="sign-in__input-password"
          placeholder="Enter your password"
          width="390px"
          inputValue={inputPassword}
          setInputValue={setInputPassword}
        />
        {issueText !== -1
          ? errorTexts[issueText]
          : ''}
        <div className={`sign-in__buttons-block ${issueText !== -1 ? '' : 'sign-in__correct'}`}>
          <Button
            click={() => submitFunction()}
            className="sign-in__submit-button "
            text="Sign in"
            type="primary"
            size="md"
          />
          <Button
            click={() => routeChange('/forgot-password')}
            className="sign-in__forgot-password-button"
            text="Forgot password"
            type="secondary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
