/* eslint-disable jsx-a11y/anchor-is-valid */
import './Header.scss';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import { getLoginData, removeLoginData, setLoginData } from '../../../utils/LocalStorageUtil';
import DropdownMenu from '../dropdown-menu/DropdownMenu';

function Header() {
  const navigate = useNavigate();
  const routeChange = (route) => {
    navigate(route);
  };

  const LIT = () => {
    if (getLoginData()) {
      removeLoginData()
    } else {
      setLoginData('loginData', { 'username': 'Qwerty', 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzZGdnZmhnZ2ZzZEBkaGcuc2EiLCJpYXQiOjE2NjkxMDQxOTV9.Ed2Hm48MGS0IT2ui4ND9awU6ewc5_cmjBftjx83YQ6Q' });
    }
  };

  return (
    <div className="header-wrapper">
      <div className="logo-block header-block">
        <Icon click={() => routeChange('/')} name="logo" size="60px" className="logo-block__icon" />
      </div>

      <div className="options-block header-block">
        <Link className="options-block__option" to="/">Welcome page</Link>
        <Link className={`options-block__option ${getLoginData() ? '' : 'options-block__disabled'}`} to="/home">Home</Link>
        <Link className="options-block__option" to="/help">Help</Link>
        {/* <Link onClick={LIT} className="options-block__option">[!LIT!]</Link> */}
      </div>
      <div className="login-block header-block">
        {getLoginData()
          ?
          <DropdownMenu
            className="login-block__dropdown-menu"
            width='270px'
            position={
              {
                top: "70px",
                left: "-10px"
              }
            }
            triggerContent={<Link className="login-block__username">{getLoginData().username}</Link>}
            dropdownContent={
              <div className='login-block__dropdown-content'>
                <Link className="login-block__dropdown-option" to="/settings">Settings</Link>
                <Link onClick={() => { removeLoginData() }} className="login-block__dropdown-option">Unlogin</Link>
              </div>
            }
          />
          : (
            <div className="login-block__unlogin">
              <Button click={() => routeChange('sign-in')} text="Sign in" type="primary" size="sm" />
              <Button click={() => routeChange('sign-up')} text="Sign up" type="primary" size="sm" />
            </div>
          )}
      </div>
    </div>
  );
}

export default Header;
