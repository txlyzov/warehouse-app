import "./footer.scss"
import React from 'react';
import Icon from "../icon/icon";

function Footer() {
    const newPage = (route) => {
        window.open(route, '_blank');
    }


    return (
        <div className="footer-wrapper">
            <div className="socials-block footer-block">
                <h2 className="socials-block__caption">Socials:</h2>
                <Icon target="_blank" click={() => newPage('https://www.facebook.com')} name="facebook" size="50px" className="socials-block__icon" />
                <Icon target="_blank" click={() => newPage('https://www.pinterest.com')} name="pinterest" size="50px" className="socials-block__icon" />
                <Icon target="_blank" click={() => newPage('https://www.youtube.com')} name="youtube" size="50px" className="socials-block__icon" />
                <Icon target="_blank" click={() => newPage('https://www.reddit.com')} name="reddit" size="50px" className="socials-block__icon" />
            </div>
            <div className="info-block footer-block">
                <h2 className="info-block__caption">For:</h2>
                <h2 className="info-block__item">SA</h2>
                <h2 className="info-block__item">SP</h2>
                <h2 className="info-block__item">SE</h2>
            </div>
        </div>
    );
}

export default Footer;
