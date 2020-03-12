import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import Slider from '../../component/Slideshow/Slideshow';

class UserHome extends React.Component{
    render() {
        return (
            <div>
                <Navbar/>
                <Slider/>
                <div className="main-content-container"></div>
            </div>
        );
    }
}
export default UserHome;