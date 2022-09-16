import "./ForgotPassword.scss"
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useState, useEffect } from "react";

function ForgotPassword() {
    const [inputEmail, setInputEmail] = useState('');
    useEffect(() => {
    }, []);
    // let issueText = '';
    let issueText = <h3 className="forgot-password__issue">Account does not exist. [<Link className="" to="/">Registration</Link>]</h3>

    const submitFunction = () => {
        console.log(inputEmail);
    }

    return (
        <div className="forgot-password wrapper">
            <div className="forgot-password__form">
                <h2 className="forgot-password__header">Forgot password?</h2>
                <hr className="forgot-password__separator"></hr>
                <h3 className="forgot-password__prompt">Type your account email here:</h3>
                <Input type="email"
                    closable={true}
                    className="forgot-password__input"
                    placeholder="Enter your email"
                    width="390px"
                    onChange={e => setInputEmail(e.target.value)}
                    inputValue={inputEmail}
                    setInputValue={setInputEmail} />
                {issueText ?
                    issueText
                    : ''}
                <Button
                    click={() => submitFunction()}
                    className={`forgot-password__submit-button ${issueText ? '' : 'forgot-password__correct'}`}
                    text="Sign in"
                    type="primary"
                    size="md">
                </Button>
            </div>
        </div>
    );
}

export default ForgotPassword;