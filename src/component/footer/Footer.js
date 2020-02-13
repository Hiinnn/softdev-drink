import React from 'react';
import './Footer.css';

const Footer = () =>{
    let randomNumber = Math.random();
    return (
        <div className="footer-wrapper">
            {
                randomNumber<0.5 ?
                <div> you lose </div>: 
                <div> you win</div>
            }        
        </div>
    );
}

export default Footer;