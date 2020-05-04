import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import Myfav from '../../component/Profile/Myfav';
import Profile from '../../component/Profile/Profile';
import Password from '../../component/Profile/Password';
import './User-profile.css';
import Axios from 'axios';

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData() {
        const url = `${localStorage.getItem('url')}/user/profile/my_profile/`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.get(url, { headers: head })
            .then((res) => {
                console.log('prof', res);
                this.setState({
                    userData: res.data
                })
            })
            .catch((err) => {
                console.log('prof', err.response);
            })
    }

    render() {
        return (
            <div>
                <div className="userprofile-container">
                    <br /><br /><br />
                    <Profile userData={this.state.userData} />
                    <br /> <br />
                    <Password />
                    <br />
                    {/* <Myfav /> */}
                </div>
            </div>
        );
    }
}
export default UserProfile;
