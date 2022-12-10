import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_VARIBLES } from '../../../utils/Constants';
import Button from '../../components/button/Button';
import NO_PAGE from './NoPage.dictionary';
import './NoPage.scss'

function NoPage() {
  const navigate = useNavigate();
  const routeChange = (route) => {
    navigate(route);
  };

  return (
    <div className='no-page wrapper'>
      <div className='no-page__content-block'>
        <div className='no-page__content'>
          <h1 className='no-page__title'>{NO_PAGE.TEXTS.MAIN_TITLE}</h1>
          <h2 className='no-page__note'>{NO_PAGE.TEXTS.PROMT_1}</h2>
          <Button
            data-testid={NO_PAGE.BUTTON.RETURN.TEST_ID}
            text={NO_PAGE.BUTTON.RETURN.TEXT}
            className="no-page__return-button"
            click={() => routeChange(PATH_VARIBLES.MAIN)}
            size="lg"
            type="secondary"
          />
        </div>
      </div>
    </div>
  );
}

export default NoPage;
