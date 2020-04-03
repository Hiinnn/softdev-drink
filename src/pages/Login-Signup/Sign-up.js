import React from 'react';
import SignUp from '../../component/Login-Sigup/SignUp-form';
import Navbar from '../../component/Nav-bar/Nav-bar';

export default class SignUpPage extends React.Component {
    render() {
        const style = {
            width: '100%',
            height: '600px'
        }
        return (
            <div>
                <Navbar/>
                <SignUp/>
            </div>
        )
    }
}