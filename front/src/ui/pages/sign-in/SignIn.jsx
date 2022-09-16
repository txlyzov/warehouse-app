import "./SignIn.scss"
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useState } from "react";

function SignIn() {
    let issueText = <h3 className="sign-in__issue">Account does not exist. [<Link className="" to="/forgot-password">Registration</Link>]</h3>

    const [inputEmail, setInputEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitFunction = () => {
        // console.log(inputEmail);
    }

    return (
        <div className="sign-in wrapper">
            <div className="sign-in__form">
                <h2 className="sign-in__header">Sign in</h2>
                <hr className="sign-in__separator"></hr>
                <h3 className="sign-in__prompt">Type your account email here:</h3>
                <Input type="email"
                    closable={true}
                    className="sign-in__input-email"
                    placeholder="Enter your email"
                    width="390px"
                    onChange={e => setInputEmail(e.target.value)}
                    inputValue={inputEmail}
                    setInputValue={setInputEmail} />
                <h3 className="sign-in__prompt">Type your password here:</h3>
                <Input type="password"
                    closable={true}
                    className="sign-in__input-password"
                    placeholder="Enter your password"
                    width="390px"
                    onChange={e => setPassword(e.target.value)}
                    inputValue={password}
                    setInputValue={setPassword} />
                {issueText ?
                    issueText
                    : ''}
                <Button
                    click={() => submitFunction()}
                    className={`sign-in__submit-button ${issueText ? '' : 'sign-in__correct'}`}
                    text="Sign in"
                    type="primary"
                    size="md">
                </Button>
            </div>
        </div>
    );
}

export default SignIn;