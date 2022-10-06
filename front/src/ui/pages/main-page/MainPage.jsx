import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginData } from '../../../utils/LocalStorageUtil';
import Button from '../../components/button/Button';
import './MainPage.scss'

function MainPage() {
    const [isAutorised, setIsAutorised] = useState(false);
    useEffect(() => {
        setIsAutorised(!!JSON.parse(localStorage.getItem('loginData')));
    }, [getLoginData()]);
    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    return (
        <div className='main-page wrapper'>
            <div className='main-page__content-block'>
                <div className='main-page__content'>
                    <h1 className='main-page__title'>Warehouse? Easy!</h1>
                    <h2 className='main-page__note'>Management help is here!</h2>
                    <div className='main-page__buttons-block'>
                        <Button
                            className="main-page__next-button"
                            click={() => routeChange(isAutorised ? '/home' : '/sign-up')}
                            size="lg" type="primary"
                            text={isAutorised ? "Home page" : "Join now!"} />
                        <Button
                            className="main-page__help-button"
                            click={() => routeChange('/help')}
                            size="lg"
                            type="secondary"
                            text="See Information!" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
