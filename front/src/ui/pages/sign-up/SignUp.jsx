import "./SignUp.scss"
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useState } from "react";

function SignUp() {
    let issueText = <h3 className="sign-up__issue">Account does not exist. [<Link className="" to="/">Registration</Link>]</h3>

    const [inputEmail, setInputEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitFunction = () => {
        // console.log(inputEmail);
    }

    return (
        <div className="sign-up wrapper">
            <div className="sign-up__form">
                <h2 className="sign-up__header">Sign up</h2>
                <hr className="sign-up__separator"></hr>
                <h3 className="sign-up__prompt">Type your account email here:</h3>
                <Input type="email"
                    closable={true}
                    className="sign-up__input-email"
                    placeholder="Enter your email"
                    width="390px"
                    onChange={e => setInputEmail(e.target.value)}
                    inputValue={inputEmail}
                    setInputValue={setInputEmail} />
                <h3 className="sign-up__prompt">Type your password here:</h3>
                <Input type="password"
                    closable={true}
                    className="sign-up__input-password"
                    placeholder="Enter your password"
                    width="390px"
                    onChange={e => setPassword(e.target.value)}
                    inputValue={password}
                    setInputValue={setPassword} />
                <Input type="password"
                    closable={true}
                    className="sign-up__input-confirm"
                    placeholder="Confirm your password"
                    width="390px"
                    onChange={e => setConfirmPassword(e.target.value)}
                    inputValue={confirmPassword}
                    setInputValue={setConfirmPassword} />
                {issueText ?
                    issueText
                    : ''}
                <Button
                    click={() => submitFunction()}
                    className={`sign-up__submit-button ${issueText ? '' : 'sign-up__correct'}`}
                    text="Sign up"
                    type="primary"
                    size="md">
                </Button>
            </div>
        </div>
    );
}

export default SignUp;