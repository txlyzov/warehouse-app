import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { EMAIL_REGEX, PATH_VARIBLES } from '../../../utils/Constants';
import { registerNewUser } from '../../../services/AuthService';
import SIGN_UP from './SignUp.dictionary';

function SignUp() {
  const [issueCode, setIssueCode] = useState(SIGN_UP.ERROR.CODE.OK);
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
    let issue = SIGN_UP.ERROR.CODE.OK;
    resetInputsErrors();

    if (!inputEmail) {
      setInputEmailIssue(true);
      issue = SIGN_UP.ERROR.CODE.EMPTY_FIELDS;
    }

    if (!inputPassword) {
      setInputPasswordIssue(true);
      issue = SIGN_UP.ERROR.CODE.EMPTY_FIELDS;
    }

    if (!inputConfirmPassword) {
      setInputConfirmPasswordIssue(true);
      issue = SIGN_UP.ERROR.CODE.EMPTY_FIELDS;
    }

    if (issue !== SIGN_UP.ERROR.CODE.OK) {
      setIssueCode(issue);
      return;
    }

    if (!EMAIL_REGEX.test(inputEmail)) {
      setInputEmailIssue(true);
      setIssueCode(SIGN_UP.ERROR.CODE.EMAIL_VALIDATION);
      return;
    }

    if (inputPassword !== inputConfirmPassword) {
      setInputPasswordIssue(true);
      setInputConfirmPasswordIssue(true);
      setIssueCode(SIGN_UP.ERROR.CODE.PASSWORD_CONFIRM_FAILED);
      return;
    }
    const requestResult = await registerNewUser(inputEmail, inputPassword);
    if (requestResult.status !== StatusCodes.OK) {
      if (requestResult.response.data === 'Account already exists.') {
        setIssueCode(SIGN_UP.ERROR.CODE.EXIST_ACCOUNT);
        return
      }
      setIssueCode(SIGN_UP.ERROR.CODE.UNKNOWN);
      return
    }
    routeChange(PATH_VARIBLES.SIGN_IN);
  };

  return (
    <div className="sign-up wrapper">
      <div className="sign-up__form">
        <h2 className="sign-up__header">{SIGN_UP.TEXTS.MAIN_TITLE}</h2>
        <hr className="sign-up__separator" />
        <h3 className="sign-up__prompt">{SIGN_UP.TEXTS.PROMT_1}</h3>
        <Input
          data-testid={SIGN_UP.INPUT.EMAIL.TEST_ID}
          placeholder={SIGN_UP.INPUT.EMAIL.PLACEHOLDER}
          type="email"
          issue={inputEmailIssue}
          closable
          className="sign-up__input-email"
          width="390px"
          inputValue={inputEmail}
          setInputValue={setInputEmail}
        />
        <h3 className="sign-up__prompt">{SIGN_UP.TEXTS.PROMT_2}</h3>
        <Input
          data-testid={SIGN_UP.INPUT.PASSWORD.TEST_ID}
          placeholder={SIGN_UP.INPUT.PASSWORD.PLACEHOLDER}
          type="password"
          issue={inputPasswordIssue}
          closable
          className="sign-up__input-password"
          width="390px"
          inputValue={inputPassword}
          setInputValue={setInputPassword}
        />
        <Input
          data-testid={SIGN_UP.INPUT.CONFIRM_PASSWORD.TEST_ID}
          placeholder={SIGN_UP.INPUT.CONFIRM_PASSWORD.PLACEHOLDER}
          type="password"
          issue={inputConfirmPasswordIssue}
          closable
          className="sign-up__input-confirm"
          width="390px"
          inputValue={inputConfirmPassword}
          setInputValue={setInputConfirmPassword}
        />
        {issueCode !== SIGN_UP.ERROR.CODE.OK
          ? SIGN_UP.ERROR.CONTENT[issueCode]
          : ''}
        <div className={`sign-up__buttons-block ${issueCode !== SIGN_UP.ERROR.CODE.OK ? '' : 'sign-up__correct'}`}>
          <Button
            data-testid={SIGN_UP.BUTTON.FORGOT_PASSWORD.TEST_ID}
            text={SIGN_UP.BUTTON.FORGOT_PASSWORD.TEXT}
            click={() => routeChange(PATH_VARIBLES.FORGOT_PASSWORD)}
            className="sign-up__forgot-password-button"
            type="secondary"
            size="md"
          />
          <Button
            data-testid={SIGN_UP.BUTTON.SIGN_UP.TEST_ID}
            text={SIGN_UP.BUTTON.SIGN_UP.TEXT}
            click={() => submitFunction()}
            className="sign-up__submit-button "
            type="primary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
