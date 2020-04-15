import React from 'react';
import Probar from '../../component/Pro-bar/Pro-bar';
import Myfav from '../../component/Myfav-Profile/Myfav';
import './User-profile.css';
class UserProfile extends React.Component {

    handleClick = () => {
        alert('Save')
    };

    render() {

        return (

            <body>

                <Probar />

                <div className="main-content-container">
                    <br /><br />

                    <div className="picandpro-container">

                        <div className="profile-pic-container">
                            <img className="profile-pic" src={require('../../asset/Profile/UserIcon.png')} width="200" height="200" align="left" alt=""></img>
                        </div>

                        <div className="profile-container">

                            <label className="textheader" style={{ marginLeft: 20 }} > Profile </label>
                            <br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> Name < input className="input" type="text" style={{ marginLeft: 89 }}>
                            </input></label>
                            <br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> E-mail <input className="input" type="text" style={{ marginLeft: 82 }}>
                            </input></label>
                            <br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> Mobile <input className="input" type="text" style={{ marginLeft: 82 }}>
                            </input> </label>
                            <br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> Date of birth <input className="input" type="text" style={{ marginLeft: 30 }}>
                            </input></label>
                            <br /><br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> Gender <input type="radio" name="gender" style={{ marginLeft: 75 }}>
                            </input> <label> Male </label> <input type="radio" name="gender" style={{ marginLeft: 50 }}></input> <label> Female </label> </label>
                            <br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> Description </label>
                            <br /><br />

                            <textarea className="textarea" style={{ marginLeft: 20 }} type="text" placeholder={"Description..."} ></textarea>
                            <br /><br />

                            <div className="one-button" onClick={this.handleClick} > Save Profile </div>
                            <br /><br /><br />

                        </div>

                    </div>

                    <br /> <br /> <br />

                    <div className="password-container" style={{ marginLeft: "50%" }}>

                        <label className="textheader" style={{ marginLeft: 20 }}> Password Reset </label>
                        <br /><br />

                        <label className="text" style={{ marginLeft: 20 }}> Current Password <input className="input" type="password" style={{ marginLeft: 104 }}>
                        </input></label>
                        <br /><br />

                        <label className="text" style={{ marginLeft: 20 }}> New Password <input className="input" type="password" style={{ marginLeft: 129 }}>
                        </input></label>
                        <br /><br />

                        <label className="text" style={{ marginLeft: 20 }}> Confirm New Password <input className="input" type="password" style={{ marginLeft: 60 }}>
                        </input></label>
                        <br /><br /><br />

                        <div className="two-button" onClick={this.handleClick}> Save Password </div>
                        <br /><br /><br />

                    </div>

                    <br />

                    <Myfav />

                </div>
                
            </body >
        );
    }
}
export default UserProfile;
