import React from 'react';
import Probar from '../../component/Pro-bar/Pro-bar';
import Myfav from '../../component/Myfav-Profile/Myfav';
import Profile from '../../component/Profile/Profile';
import Password from '../../component/Password/Password';
import './User-profile.css';

class UserProfile extends React.Component {

    handleClick = () => {
        alert('Save')
    };

    render() {
        return (
            <div>
                <Probar />
                <div className="main-content-container">
                    <br /><br /><br />
                    <Profile />
                    <br /> <br /> <br />
                    <Password />
                    <br />
                    <Myfav />
                </div>
            </div>
        );
    }
}
export default UserProfile;
