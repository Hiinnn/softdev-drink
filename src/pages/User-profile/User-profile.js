import React from 'react';
import Probar from '../../component/Pro-bar/Pro-bar';
import './User-profile.css';
class UserProfile extends React.Component {

    handleClick = () => {
        alert('Save')
    };

    learnClick = () => {
        alert('Learn more')
    };

    heartClick = () => {
        alert('Add to my favourite')
    };

    render() {

        return (

            <body>

                <Probar />

                <div className="main-content-container">
                    <br /><br />

                    <div className="picandpro-container" style={{ marginLeft: "19%" }}>

                        <img src={require('../../asset/Profile/UserIcon.png')} width="200" height="200" align="left" ></img>

                        <div className="profile-container" style={{ marginLeft: "9%" }} >

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

                            <textarea className="textarea" style={{ marginLeft: 20 }} type="text" placeholder="Description..." > </textarea>
                            <br /><br />

                            <div className="one-button" onClick={this.handleClick} > Save Profile </div>
                            <br /><br /><br />

                        </div>

                    </div>

                    <div className="password-container" style={{ marginLeft: "38%" }}>

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


                    <div className="myfav-container" style={{ marginLeft: "15%" }}>

                        <div className="textheader" style={{ marginLeft: "7%" }}> My Favourite </div>

                        <img src={require('../../asset/Profile/line.png')} width="100%" height="100"></img>

                        <img src={require('../../asset/Profile/1.jpg')} width="44%" height="35%" style={{ paddingLeft: "10%" }} align="left"></img>
                        <div className="fav-container" style={{ paddingLeft: "2%" }} >
                            <label className="textheader" style={{ marginLeft: 20 }} > Cafe's Name </label>
                            <div className="heart" onClick={this.heartClick} style={{ marginLeft: 350 }}></div>
                            <br /><br />
                            <div className="learn-button" onClick={this.learnClick} style={{ marginLeft: 20 }}> LEARN MORE </div>
                            <label className="text" style={{ marginLeft: 20 }} > open close </label>
                            <label className="text" style={{ marginLeft: 20 }} > location </label>
                            <label className="text" style={{ marginLeft: 20 }} > type </label>
                            <label className="text" style={{ marginLeft: 20 }} > contact </label>
                        </div><br />

                        <img src={require('../../asset/Profile/line.png')} width="100%" height="100"></img>

                        <img src={require('../../asset/Profile/1.jpg')} width="44%" height="35%" style={{ paddingLeft: "10%" }} align="left"></img>
                        <div className="fav-container" style={{ paddingLeft: "2%" }} >
                            <label className="textheader" style={{ marginLeft: 20 }} > Cafe's Name </label>
                            <div className="heart" onClick={this.heartClick} style={{ marginLeft: 350 }}></div>
                            <br /><br />
                            <div className="learn-button" onClick={this.learnClick} style={{ marginLeft: 20 }}> LEARN MORE </div>
                            <label className="text" style={{ marginLeft: 20 }} > open close </label>
                            <label className="text" style={{ marginLeft: 20 }} > location </label>
                            <label className="text" style={{ marginLeft: 20 }} > type </label>
                            <label className="text" style={{ marginLeft: 20 }} > contact </label>
                        </div><br />

                        <img src={require('../../asset/Profile/line.png')} width="100%" height="100"></img>

                        <img src={require('../../asset/Profile/1.jpg')} width="44%" height="35%" style={{ paddingLeft: "10%" }} align="left"></img>
                        <div className="fav-container" style={{ paddingLeft: "2%" }} >
                            <label className="textheader" style={{ marginLeft: 20 }} > Cafe's Name </label>
                            <div className="heart" onClick={this.heartClick} style={{ marginLeft: 350 }}></div>
                            <br /><br />
                            <div className="learn-button" onClick={this.learnClick} style={{ marginLeft: 20 }}> LEARN MORE </div>
                            <label className="text" style={{ marginLeft: 20 }} > open close </label>
                            <label className="text" style={{ marginLeft: 20 }} > location </label>
                            <label className="text" style={{ marginLeft: 20 }} > type </label>
                            <label className="text" style={{ marginLeft: 20 }} > contact </label>
                        </div><br />

                        <img src={require('../../asset/Profile/line.png')} width="100%" height="100"></img>

                        <div className="three-button" onClick={this.handleClick}> Save My Favourite </div>
                        <br /><br />

                    </div>
                </div>
            </body>
        );
    }
}
export default UserProfile;