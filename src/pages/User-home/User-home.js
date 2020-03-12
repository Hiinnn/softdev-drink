import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import Slider from '../../component/Slideshow/Slideshow';
import './User-home.css';

class UserHome extends React.Component{
    render() {
        return (
            <div>
                <Navbar/>
                <Slider/>
                <div className="main-content-container">
                    <img src={require('../../asset/MainBackground/bg1cp.jpeg')}>
                        
                    </img>
                </div>
            </div>
        );
    }
}
export default UserHome;

eiei