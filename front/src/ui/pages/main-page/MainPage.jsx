import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginData } from '../../../utils/LocalStorageUtil';
import Button from '../../components/button/Button';
import MAIN_PAGE from './MainPage.dictionary';
import './MainPage.scss'

function MainPage() {
    const [isAutorised, setIsAutorised] = useState(false);

    useEffect(() => {
        setIsAutorised(!!getLoginData('loginData'));
    }, [getLoginData()]);

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    return (
        <div className='main-page wrapper'>
            <div className='main-page__content-block'>
                <div className='main-page__content'>
                    <h1 className='main-page__title'>{MAIN_PAGE.TEXTS.MAIN_TITLE}</h1>
                    <h2 className='main-page__note'>{MAIN_PAGE.TEXTS.PROMT_1}</h2>
                    <div className='main-page__buttons-block'>
                        <Button
                            data-testid={MAIN_PAGE.BUTTON.TEST_ID[0]}
                            text={isAutorised ? MAIN_PAGE.BUTTON.TEXT[0][0] : MAIN_PAGE.BUTTON.TEXT[0][1]}
                            className="main-page__next-button"
                            click={() => routeChange(isAutorised ? '/home' : '/sign-up')}
                            size="lg" type="primary"
                        />
                        <Button
                            data-testid={MAIN_PAGE.BUTTON.TEST_ID[1]}
                            text={MAIN_PAGE.BUTTON.TEXT[1]}
                            className="main-page__help-button"
                            click={() => routeChange('/help')}
                            size="lg"
                            type="secondary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
