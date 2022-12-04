import './SignIn.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { loginUser } from '../../../services/AuthService';
import { EMAIL_REGEX } from '../../../utils/Constants';
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
    if (requestResult.status !== 200) {
      if (requestResult.response.data === 'Wrong email.') {
        setIssueCode(SIGN_IN.ERROR.CODE.UNEXIST_ACCOUNT);
        return
      }
      if (requestResult.response.data === 'Wrong password.') {
        setIssueCode(SIGN_IN.ERROR.CODE.WRONG_PASSWORD);
        return
      }
      setIssueCode(SIGN_IN.ERROR.CODE.UNKNOWN);
      return
    }
    routeChange('/home');
  };

  return (
    <div className="sign-in wrapper">
      <div className="sign-in__form">
        <h2 className="sign-in__header">{SIGN_IN.TEXTS.MAIN_TITLE}</h2>
        <hr className="sign-in__separator" />
        <h3 className="sign-in__prompt">{SIGN_IN.TEXTS.PROMT_1}</h3>
        <Input
          data-testid={SIGN_IN.INPUT.TEST_ID[0]}
          placeholder={SIGN_IN.INPUT.PLACEHOLDER[0]}
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
          data-testid={SIGN_IN.INPUT.TEST_ID[1]}
          placeholder={SIGN_IN.INPUT.PLACEHOLDER[1]}
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
            data-testid={SIGN_IN.BUTTON.TEST_ID[0]}
            text={SIGN_IN.BUTTON.TEXT[0]}
            click={() => routeChange('/forgot-password')}
            className="sign-in__forgot-password-button"
            type="secondary"
            size="md"
          />
          <Button
            data-testid={SIGN_IN.BUTTON.TEST_ID[1]}
            text={SIGN_IN.BUTTON.TEXT[1]}
            click={() => submitFunction()}
            className="sign-in__submit-button "
            type="primary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
