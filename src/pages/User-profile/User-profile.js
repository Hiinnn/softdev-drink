import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import Myfav from '../../component/Myfav-Profile/Myfav';
import Profile from '../../component/Profile/Profile';
import Password from '../../component/Password/Password';
import './User-profile.css';

class UserProfile extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <div className="userprofile-container">
                    <br /><br /><br />
                    <Profile />
                    <br /> <br />
                    <Password />
                    <br />
                    <Myfav />
                </div>
            </div>
        );
    }
}
export default UserProfile;
