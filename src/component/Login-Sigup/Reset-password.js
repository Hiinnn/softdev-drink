import React from 'react'
import './Reset-password.css'

export default class ResetPassword extends React.Component {
    render() {
        return (
            <div className="reset-pw-container">
                <div className="reset-bg">
                    <div className="reset-text">
                        We've sent a new Password to your Email <a style={{ color: 'rgb(21, 58, 21)' }}> YOUR EMAIL </a>
                        <br />
                    You can change your Password at your profile
                    </div>
                </div>
                
            </div>
        )
    }
}