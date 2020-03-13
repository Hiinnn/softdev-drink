import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import Slider from '../../component/Slideshow/Slideshow';
import Hotbar from '../../component/Hot-bars/Hot-bar';
import './User-home.css';

class UserHome extends React.Component{
    render() {
        return (
            <div>
                <Navbar/>
                <Slider/>
                <div className="main-content-container">
                    {/* <Hotbar/> */}
                </div>
            </div>
        );
    }
}
export default UserHome;
