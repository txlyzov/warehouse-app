import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_VARIBLES } from '../../../utils/Constants';
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
                            data-testid={MAIN_PAGE.BUTTON.NEXT.TEST_ID}
                            text={isAutorised ? MAIN_PAGE.BUTTON.NEXT.TEXT[0] : MAIN_PAGE.BUTTON.NEXT.TEXT[1]}
                            className="main-page__next-button"
                            click={() => routeChange(isAutorised ? PATH_VARIBLES.HOME : PATH_VARIBLES.SIGN_UP)}
                            size="lg" type="primary"
                        />
                        <Button
                            data-testid={MAIN_PAGE.BUTTON.HELP.TEST_ID}
                            text={MAIN_PAGE.BUTTON.HELP.TEXT}
                            className="main-page__help-button"
                            click={() => routeChange(PATH_VARIBLES.HELP)}
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
