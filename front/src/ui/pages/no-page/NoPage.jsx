import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
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
          <h1 className='no-page__title'>Nothing here!</h1>
          <h2 className='no-page__note'>Probably you are lost</h2>
          <Button click={() => routeChange('/')} type="secondary" className="no-page__return-button" text="Return" />
        </div>
      </div>
    </div>
  );
}

export default NoPage;
