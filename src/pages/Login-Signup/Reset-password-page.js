import React from 'react';
import ResetPassword from '../../component/Login-Sigup/Reset-password'
import Navbar from '../../component/Nav-bar/Nav-bar'

export default class ResetPasswordPage extends React.Component {
    render(){
        return(
            <div>
                <Navbar/>
                <ResetPassword/>
            </div>
        )
    }
}