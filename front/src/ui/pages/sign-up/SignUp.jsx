import "./SignUp.scss"
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useState } from "react";
import { EMAIL_FRONT_REGEX, EMAIL_REGEX, AUTH } from "../../../utils/Constants";
import { loginUser, registerNewUser } from "../../../services/AuthService";

function SignUp() {
    // let issueText = <h3 className="sign-up__issue">Account does not exist. [<Link className="" to="/">Registration</Link>]</h3>
    const errorTexts = {
        0: <h3 className="sign-up__issue">Empty fields!</h3>,
        1: <h3 className="sign-up__issue">Email should be like example@email.com</h3>,
        2: <h3 className="sign-up__issue">Passwords not confirmed.</h3>,
        4: <h3 className="sign-up__issue">Account already exist. [<Link className="" to="/sign-in">Sign in</Link>]</h3>,
        6: <h3 className="sign-up__issue">Unknown error(request failed).</h3>,
    }

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
    }

    const resetInputsErrors = () => {
        setInputEmailIssue(false);
        setInputPasswordIssue(false);
        setInputConfirmPasswordIssue(false);
    }

    const submitFunction = () => {
        let issue = AUTH.NO_ERROR
        resetInputsErrors()

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
            return
        }

        if (!EMAIL_REGEX.test(inputEmail)) {
            setInputEmailIssue(true);
            setIssueText(AUTH.ERROR_EMAIL_UNCORRECT);
            return
        }

        if (inputPassword !== inputConfirmPassword) {
            setInputPasswordIssue(true);
            setInputConfirmPasswordIssue(true);
            setIssueText(AUTH.ERROR_PASSWORD_NOT_EQUAL);
            return
        }
        let requestResult = registerNewUser(inputEmail, inputPassword)
        // if (!requestResult) {
        //     setIssueText(errorRequest);
        //     return
        // }
        let token = "anytoken";
        let username = inputEmail.match(EMAIL_FRONT_REGEX)[0];
        localStorage.setItem("loginData", JSON.stringify({ username, token }));
        routeChange('/home')
    }

    return (
        <div className="sign-up wrapper">
            <div className="sign-up__form">
                <h2 className="sign-up__header">Sign up</h2>
                <hr className="sign-up__separator"></hr>
                <h3 className="sign-up__prompt">Type your account email here:</h3>
                <Input type="email"
                    issue={inputEmailIssue}
                    closable={true}
                    className="sign-up__input-email"
                    placeholder="Enter your email"
                    width="390px"
                    onChange={e => setInputEmail(e.target.value)}
                    inputValue={inputEmail}
                    setInputValue={setInputEmail} />
                <h3 className="sign-up__prompt">Type your password here:</h3>
                <Input type="password"
                    issue={inputPasswordIssue}
                    closable={true}
                    className="sign-up__input-password"
                    placeholder="Enter your password"
                    width="390px"
                    onChange={e => setInputPassword(e.target.value)}
                    inputValue={inputPassword}
                    setInputValue={setInputPassword} />
                <Input type="password"
                    issue={inputConfirmPasswordIssue}
                    closable={true}
                    className="sign-up__input-confirm"
                    placeholder="Confirm your password"
                    width="390px"
                    onChange={e => setInputConfirmPassword(e.target.value)}
                    inputValue={inputConfirmPassword}
                    setInputValue={setInputConfirmPassword} />
                {issueText !== -1 ?
                    errorTexts[issueText]
                    : ''}
                <div className={`sign-up__buttons-block ${issueText !== -1 ? '' : 'sign-up__correct'}`}>
                    <Button
                        click={() => submitFunction()}
                        className={`sign-up__submit-button `}
                        text="Sign up"
                        type="primary"
                        size="md">
                    </Button>
                    <Button
                        click={() => routeChange('/forgot-password')}
                        className={`sign-up__forgot-password-button`}
                        text="Forgot password"
                        type="secondary"
                        size="md">
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;