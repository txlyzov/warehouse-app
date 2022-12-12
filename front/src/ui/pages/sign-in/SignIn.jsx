import './SignIn.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { loginUser } from '../../../services/AuthService';
import { EMAIL_REGEX, PATH_VARIBLES } from '../../../utils/Constants';
import SIGN_IN from './SignIn.dictionary';

function SignIn() {
  const [issueCode, setIssueCode] = useState(SIGN_IN.ERROR.CODE.OK);
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

  const submitFunction = async () => {
    let issue = SIGN_IN.ERROR.CODE.OK;
    resetInputsErrors();

    if (!inputEmail) {
      setInputEmailIssue(true);
      issue = SIGN_IN.ERROR.CODE.EMPTY_FIELDS;
    }

    if (!inputPassword) {
      setInputPasswordIssue(true);
      issue = SIGN_IN.ERROR.CODE.EMPTY_FIELDS;
    }

    if (issue !== SIGN_IN.ERROR.CODE.OK) {
      setIssueCode(issue);
      return;
    }

    if (!EMAIL_REGEX.test(inputEmail)) {
      setInputEmailIssue(true);
      setIssueCode(SIGN_IN.ERROR.CODE.EMAIL_VALIDATION);
      return;
    }
    const requestResult = await loginUser(inputEmail, inputPassword);
    if (requestResult.status !== StatusCodes.OK) {
      if (requestResult.response.data === SIGN_IN.SERVER.WRONG_EMAIL_ERROR) {
        setIssueCode(SIGN_IN.ERROR.CODE.UNEXIST_ACCOUNT);
        return
      }
      if (requestResult.response.data === SIGN_IN.SERVER.WRONG_PASSWORD_ERROR) {
        setIssueCode(SIGN_IN.ERROR.CODE.WRONG_PASSWORD);
        return
      }
      setIssueCode(SIGN_IN.ERROR.CODE.UNKNOWN);
      return
    }
    routeChange(PATH_VARIBLES.HOME);
  };

  return (
    <div className="sign-in wrapper">
      <div className="sign-in__form">
        <h2 className="sign-in__header">{SIGN_IN.TEXTS.MAIN_TITLE}</h2>
        <hr className="sign-in__separator" />
        <h3 className="sign-in__prompt">{SIGN_IN.TEXTS.PROMT_1}</h3>
        <Input
          data-testid={SIGN_IN.INPUT.EMAIL.TEST_ID}
          placeholder={SIGN_IN.INPUT.EMAIL.PLACEHOLDER}
          type="email"
          issue={inputEmailIssue}
          closable
          className="sign-in__input-email"
          width="390px"
          inputValue={inputEmail}
          setInputValue={setInputEmail}
        />
        <h3 className="sign-in__prompt">{SIGN_IN.TEXTS.PROMT_2}</h3>
        <Input
          data-testid={SIGN_IN.INPUT.PASSWORD.TEST_ID}
          placeholder={SIGN_IN.INPUT.PASSWORD.PLACEHOLDER}
          type="password"
          issue={inputPasswordIssue}
          closable
          className="sign-in__input-password"
          width="390px"
          inputValue={inputPassword}
          setInputValue={setInputPassword}
        />
        {issueCode !== SIGN_IN.ERROR.CODE.OK
          ? SIGN_IN.ERROR.CONTENT[issueCode]
          : ''}
        <div className={`sign-in__buttons-block ${issueCode !== SIGN_IN.ERROR.CODE.OK ? '' : 'sign-in__correct'}`}>
          <Button
            data-testid={SIGN_IN.BUTTON.FORGOT_PASSWORD.TEST_ID}
            text={SIGN_IN.BUTTON.FORGOT_PASSWORD.TEXT}
            click={() => routeChange(PATH_VARIBLES.FORGOT_PASSWORD)}
            className="sign-in__forgot-password-button"
            type="secondary"
            size="md"
          />
          <Button
            data-testid={SIGN_IN.BUTTON.SIGN_IN.TEST_ID}
            text={SIGN_IN.BUTTON.SIGN_IN.TEXT}
            click={() => submitFunction()}
            className="sign-in__submit-button"
            type="primary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
