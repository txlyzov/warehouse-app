import './SignUp.scss';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { EMAIL_FRONT_REGEX, EMAIL_REGEX, AUTH } from '../../../utils/Constants';
import { loginUser, registerNewUser } from '../../../services/AuthService';

function SignUp() {
  // eslint-disable-next-line max-len
  // let issueText = <h3 className="sign-up__issue">Account does not exist. [<Link className="" to="/">Registration</Link>]</h3>
  const errorTexts = {
    0: <h3 className="sign-up__issue">Empty fields!</h3>,
    1: <h3 className="sign-up__issue">Email should be like example@email.com</h3>,
    2: <h3 className="sign-up__issue">Passwords not confirmed.</h3>,
    4: <h3 className="sign-up__issue">
      Account already exist. [
      <Link className="" to="/sign-in">Sign in</Link>
      ]
      {/* eslint-disable-next-line react/jsx-indent */}
    </h3>,
    6: <h3 className="sign-up__issue">Unknown error(request failed).</h3>,
  };

  const [issueText, setIssueText] = useState(-1);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [inputEmailIssue, setInputEmailIssue] = useState(false);
  const [inputPasswordIssue, setInputPasswordIssue] = useState(false);
  const [inputConfirmPasswordIssue, setInputConfirmPasswordIssue] = useState(false);

  const navigate = useNavigate();
  const routeChange = (route) => {
    navigate(route);
  };

  const resetInputsErrors = () => {
    setInputEmailIssue(false);
    setInputPasswordIssue(false);
    setInputConfirmPasswordIssue(false);
  };

  const submitFunction = async () => {
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

    if (!inputConfirmPassword) {
      setInputConfirmPasswordIssue(true);
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

    if (inputPassword !== inputConfirmPassword) {
      setInputPasswordIssue(true);
      setInputConfirmPasswordIssue(true);
      setIssueText(AUTH.ERROR_PASSWORD_NOT_EQUAL);
      return;
    }
    const requestResult = await registerNewUser(inputEmail, inputPassword);
    if (requestResult.status !== 200) {
      if (requestResult.response.data === 'Account already exists.') {
        setIssueText(AUTH.ERROR_EXIST_ACCOUNT);
        return
      }
      setIssueText(AUTH.ERROR_REQUEST);
      return
    }
    routeChange('/sign-in');
  };

  return (
    <div className="sign-up wrapper">
      <div className="sign-up__form">
        <h2 className="sign-up__header">Sign up</h2>
        <hr className="sign-up__separator" />
        <h3 className="sign-up__prompt">Type your account email here:</h3>
        <Input
          type="email"
          issue={inputEmailIssue}
          closable
          className="sign-up__input-email"
          placeholder="Enter your email"
          width="390px"
          inputValue={inputEmail}
          setInputValue={setInputEmail}
        />
        <h3 className="sign-up__prompt">Type your password here:</h3>
        <Input
          type="password"
          issue={inputPasswordIssue}
          closable
          className="sign-up__input-password"
          placeholder="Enter your password"
          width="390px"
          inputValue={inputPassword}
          setInputValue={setInputPassword}
        />
        <Input
          type="password"
          issue={inputConfirmPasswordIssue}
          closable
          className="sign-up__input-confirm"
          placeholder="Confirm your password"
          width="390px"
          inputValue={inputConfirmPassword}
          setInputValue={setInputConfirmPassword}
        />
        {issueText !== -1
          ? errorTexts[issueText]
          : ''}
        <div className={`sign-up__buttons-block ${issueText !== -1 ? '' : 'sign-up__correct'}`}>
          <Button
            click={() => submitFunction()}
            className="sign-up__submit-button "
            text="Sign up"
            type="primary"
            size="md"
          />
          <Button
            click={() => routeChange('/forgot-password')}
            className="sign-up__forgot-password-button"
            text="Forgot password"
            type="secondary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
