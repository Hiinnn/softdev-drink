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
<<<<<<< HEAD
                <div class="main-content-container">
                    <img src={require("../../asset/HomeBG/bg1cp.jpg")}/>
=======
                <div className="main-content-container">
                    <img src={require('../../asset/MainBackground/bg1cp.jpeg')}>
                        
                    </img>
>>>>>>> 7cf16304d67540d308d7f110df5a5b3ec4df8497
                </div>
            </div>
        );
    }
}
export default UserHome;

eiei