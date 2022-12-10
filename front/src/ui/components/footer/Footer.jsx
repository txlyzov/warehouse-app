import './Footer.scss';
import React from 'react';
import Icon from '../icon/Icon';
import FOOTER from './Footer.dictionary';

function Footer() {
  const newPage = (route) => {
    window.open(route, '_blank');
  };

  return (
    <div className="footer-wrapper">
      <div className="socials-block footer-block">
        <h2 className="socials-block__caption">Socials:</h2>
        <Icon target="_blank" click={() => newPage(FOOTER.LINKS.FACEBOOK)} name="facebook" size="50px" className="socials-block__icon" hoverable />
        <Icon target="_blank" click={() => newPage(FOOTER.LINKS.PINTEREST)} name="pinterest" size="50px" className="socials-block__icon" hoverable />
        <Icon target="_blank" click={() => newPage(FOOTER.LINKS.YOUTUBE)} name="youtube" size="50px" className="socials-block__icon" hoverable />
        <Icon target="_blank" click={() => newPage(FOOTER.LINKS.REDDIT)} name="reddit" size="50px" className="socials-block__icon" hoverable />
      </div>
      <div className="info-block footer-block">
        <h2 className="info-block__caption">During:</h2>
        <h2 className="info-block__item">SA</h2>
        <h2 className="info-block__item">SP</h2>
        <h2 className="info-block__item">SE</h2>
      </div>
    </div>
  );
}

export default Footer;
