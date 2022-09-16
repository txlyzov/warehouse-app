import "./header.scss"
import React from 'react';
import Icon from "../icon/icon";
import Button from "../button/button";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const [isLoggedIn, setisLoggedIn] = useState(true);

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    }

    const LIT = () => {
        setisLoggedIn(!isLoggedIn)
        console.log(isLoggedIn);
    }

    return (
        <div className="header-wrapper">
            <div className="logo-block header-block">
                <Icon click={() => routeChange('/')} name="logo" size="60px" className="logo-block__icon" />
            </div>

            <div className="options-block header-block">
                <Link className="options-block__option" to="/">Welcome page</Link>
                <Link className={`options-block__option ${isLoggedIn ? '' : 'options-block__disabled'}`} to="/home">Home</Link>
                <Link className="options-block__option" to="/help">Help</Link>
                <Link onClick={LIT} className="options-block__option">[!LIT!]</Link>
            </div>

            <div className="login-block header-block">
                {isLoggedIn === true ?
                    <Link className="login-block__username">Username</Link>
                    :
                    <div className="login-block__unlogin">
                        <Button click={() => routeChange('sign-in')} text="Sign in" type="primary" size="sm" />
                        <Button click={() => routeChange('sign-un')} text="Sign up" type="primary" size="sm" />
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;