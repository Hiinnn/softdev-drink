import React from 'react';
import SignUp from '../../component/Login-Sigup/SignUp-form';
import Navbar from '../../component/Nav-bar/Nav-bar';

export default class SignUpPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <SignUp/>
            </div>
        )
    }
}