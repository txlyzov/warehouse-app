import "./SignIn.scss"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { loginUser } from "../../../services/AuthService";
import { EMAIL_FRONT_REGEX, EMAIL_REGEX, SIGN_UP } from "../../../utils/Constants";

function SignIn() {
    const errorTexts = [
        <h3 className="sign-in__issue">Empty fields!</h3>,
        <h3 className="sign-in__issue">Email should be like example@email.com</h3>,
        <h3 className="sign-in__issue">Account does not exist. [<Link className="" to="/forgot-password">Registration</Link>]</h3>,
        <h3 className="sign-in__issue">Wrong password.</h3>
    ]

    const [issueText, setIssueText] = useState(-1);
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputEmailIssue, setInputEmailIssue] = useState(false);
    const [inputPasswordIssue, setInputPasswordIssue] = useState(false);
    const navigate = useNavigate();

    const resetInputsErrors = () => {
        setInputEmailIssue(false);
        setInputPasswordIssue(false)
    }


    const submitFunction = () => {
        let issue = SIGN_UP.NO_ERROR
        resetInputsErrors()

        if (!inputEmail) {
            setInputEmailIssue(true);
            issue = SIGN_UP.ERROR_EMPTY_FIELS;
        }

        if (!inputPassword) {
            setInputPasswordIssue(true);
            issue = SIGN_UP.ERROR_EMPTY_FIELS;
        }

        if (issue !== SIGN_UP.NO_ERROR) {
            setIssueText(issue);
            return
        }


        if (!EMAIL_REGEX.test(inputEmail)) {
            setIssueText(SIGN_UP.ERROR_EMAIL_UNCORRECT);
            return
        }
        let requestResult = loginUser(inputEmail, inputPassword)
        // if (!requestResult) {
        //     setIssueText(errorRequest);
        //     return
        // }
        let token = "anytoken";
        let username = inputEmail.match(EMAIL_FRONT_REGEX)[0];
        localStorage.setItem("loginData", JSON.stringify({ username, token }));
        navigate('/home')
    }

    return (
        <div className="sign-in wrapper">
            <div className="sign-in__form">
                <h2 className="sign-in__header">Sign in</h2>
                <hr className="sign-in__separator"></hr>
                <h3 className="sign-in__prompt">Type your account email here:</h3>
                <Input type="email"
                    issue={inputEmailIssue}
                    closable={true}
                    className="sign-in__input-email"
                    placeholder="Enter your email"
                    width="390px"
                    onChange={e => setInputEmail(e.target.value)}
                    inputValue={inputEmail}
                    setInputValue={setInputEmail} />
                <h3 className="sign-in__prompt">Type your password here:</h3>
                <Input type="password"
                    issue={inputPasswordIssue}
                    closable={true}
                    className="sign-in__input-password"
                    placeholder="Enter your password"
                    width="390px"
                    onChange={e => setInputPassword(e.target.value)}
                    inputValue={inputPassword}
                    setInputValue={setInputPassword} />
                {issueText !== -1 ?
                    errorTexts[issueText]
                    : ''}
                <Button
                    click={() => submitFunction()}
                    className={`sign-in__submit-button ${issueText !== -1 ? '' : 'sign-in__correct'}`}
                    text="Sign in"
                    type="primary"
                    size="md">
                </Button>
            </div>
        </div>
    );
}

export default SignIn;