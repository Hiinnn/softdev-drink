import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import Slideshow from '../../component/Slideshow/Slideshow';
import Recommended from '../../component/Recommended/Recommended';
import './User-home.css';

class UserHome extends React.Component{
    render() {
        return (
            <div>
                <Navbar/>
                {/* <div className="user-main-content-container"> */}""
                    <Slideshow/>
                    <Recommended/>
                {/* </div> */}
            </div>
        );
    }
}
export default UserHome;
