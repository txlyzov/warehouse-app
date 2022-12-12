/* eslint-disable jsx-a11y/anchor-is-valid */
import './Header.scss';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import { getLoginData, removeLoginData } from '../../../utils/LocalStorageUtil';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import HEADER from './Header.dictionary';
import { PATH_VARIBLES } from '../../../utils/Constants';

function Header() {
  const navigate = useNavigate();
  const routeChange = (route) => {
    navigate(route);
  };

  return (
    <div className="header-wrapper">
      <div className="logo-block header-block">
        <Icon click={() => routeChange(PATH_VARIBLES.MAIN)} name="logo" size="60px" className="logo-block__icon" />
      </div>

      <div className="options-block header-block">
        <Link className="options-block__option" to={PATH_VARIBLES.MAIN}>{HEADER.OPTIONS.TO_MAIN}</Link>
        <Link className={`options-block__option ${getLoginData() ? '' : 'options-block__disabled'}`} to={PATH_VARIBLES.HOME}>{HEADER.OPTIONS.TO_HOME}</Link>
        <Link className="options-block__option" to={PATH_VARIBLES.HELP}>{HEADER.OPTIONS.TO_HELP}</Link>
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
                <Link className="login-block__dropdown-option" to={PATH_VARIBLES.SETTINGS}>{HEADER.DROPDOWN.SETTINGS}</Link>
                <Link onClick={() => { removeLoginData() }} className="login-block__dropdown-option">{HEADER.DROPDOWN.LOGOUT}</Link>
              </div>
            }
          />
          : (
            <div className="login-block__unlogin">
              <Button click={() => routeChange(PATH_VARIBLES.SIGN_IN)} text="Sign in" type="primary" size="sm" />
              <Button click={() => routeChange(PATH_VARIBLES.SIGN_UP)} text="Sign up" type="primary" size="sm" />
            </div>
          )}
      </div>
    </div>
  );
}

export default Header;
