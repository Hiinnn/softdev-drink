import React from 'react'

// import './Myfav.css'
// import './Profile.css'
// import './Password.css'
import './NewProfile.css'

import Axios from 'axios';
import { Link } from 'react-router-dom';
import userData from '../../data/NEW/Drinker';
import { NotifyAlert } from '../../component/SweetAlert';

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.dataForm = {
            first_name: ['Name', 'text', 118],
            email: ['Email', 'email', 116],
            birth_date: ['Birth Month', 'month', 65],
            phone_number: ['Phone', 'text', 111],
        }
        this.passForm = {
            old_password: ['Old Password', 'password', 55],
            new_password: ['New Password', 'password', 48],
            new_password_confirm: ['Confirm Password', 'password', 20],
        }

        this.state = {
            userData: userData,
            shopArray: '',
            passwordChange: {
                old_password: '',
                new_password: '',
                new_password_confirm: '',
            },
            fav: false,
            editableData: false,
            editablePassword: false,
        };

        this.editData = this.editData.bind(this)
        this.editPassword = this.editPassword.bind(this)
        this.handleDataChange = this.handleDataChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    componentDidMount() {
        this.getUserData()
        this.getUserFav()
    }

    componentDidUpdate() {
        // Reload data
        if (!this.state.userData) this.getUserData()
        if (!this.state.shopArray) this.getUserFav()
    }

    getUserData() {
        // get user data
        const url = `${localStorage.getItem('url')}/user/profile/my_profile/`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.get(url, { headers: head })
            .then((res) => {
                // change format of birth mount and phone number
                let newData = res.data;
                newData.birth_date = newData.birth_date.slice(0, 7);
                newData.phone_number = newData.phone_number.replace('+66', 0)
                this.setState({
                    userData: newData
                })
            })
            .catch((err) => {
            })
    }

    getUserFav() {
        // get user fav shop
        const url = `${localStorage.getItem('url')}/user/profile/favorite_shop/`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.get(url, { headers: head })
            .then((res) => {
                this.setState({
                    shopArray: res.data
                })
            })
            .catch((err) => {
            })
    }

    handleDataChange = (e) => {
        // * change state when user edit profile
        const name = e.target.name;
        const value = e.target.value;
        const newData = { ...this.state.userData };

        newData[name] = value;

        this.setState({
            userData: newData
        })
    }

    editData = () => {
        // * user press edit button
        if (this.state.editableData === true) {
            // * patch request user profile
            const data = {
                new_first_name: this.state.userData.first_name,
                new_email: this.state.userData.email,
                new_birth_date: `${this.state.userData.birth_date}-01`,
                new_phone_number: this.state.userData.phone_number.replace(/^0/, '+66'),
            }
            this.patchChangeProfile(data)
        }

        // toggle form
        this.setState(() => {
            return { editableData: !this.state.editableData }
        })
    }

    handlePasswordChange = (e) => {
        // * change state when enter pw form 
        const name = e.target.name;
        const value = e.target.value;
        const newPassword = { ...this.state.passwordChange };

        newPassword[name] = value;

        this.setState({
            passwordChange: newPassword
        })
    }

    editPassword = () => {
        // * user press change pw button
        if (this.state.editablePassword === true) {
            const data = {
                old_password: this.state.passwordChange.old_password,
                new_password: this.state.passwordChange.new_password,
                new_password_confirm: this.state.passwordChange.new_password_confirm,
            }
            // patch pw user profile
            this.patchChangeProfile(data)
        }

        this.setState(() => {
            return { editablePassword: !this.state.editablePassword }
        })

    }

    patchChangeProfile(body) {
        const url = `${localStorage.getItem('url')}/user/profile/my_profile/`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        // alert when finish or fail
        Axios.patch(url, body, { headers: head })
            .then((res) => {
                NotifyAlert(() => { }, 'สำเร็จ!', 'ข้อมูลโปรไฟล์ถูกอัพเดตแล้ว', 'success');
            })
            .catch((err) => {
                NotifyAlert(() => { }, 'ล้มเหลว!', 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
            })
    }

    deleteFav(i) {
        const url = `${localStorage.getItem('url')}/user/profile/favorite_shop/${i}`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.delete(url, { headers: head })
            .then((res) => {
                NotifyAlert(() => { window.location.reload() }, 'สำเร็จ!', 'ลบร้านโปรดสำเร็จ', 'success');
            })
            .catch((err) => {
                NotifyAlert(() => { }, 'ล้มเหลว!', 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
            })
    }

    patchChangePic(e) {
        // * upload new picture
        const picture = new FormData()
        const url = `${localStorage.getItem('url')}/user/profile/my_profile/`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }
        picture.append('new_picture', e.target.files[0])

        NotifyAlert(() => { }, 'กำลังดำเนินการ', 'กำลังอัพเดตรูปโปรไฟล์ กรุณารอสักครู่', 'info', false);

        Axios.patch(url, picture, { headers: head })
            .then((res) => {
                console.log(res);
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
                NotifyAlert(() => { }, 'สำเร็จ!', 'รูปโปรไฟล์ถูกอัพเดตแล้ว โปรดรีเฟรชหน้าเว็บของท่าน', 'success');
            })
            .catch((err) => {
                NotifyAlert(() => { }, 'ล้มเหลว!', 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
            })
    }

    render() {
        return (
            <>
                <div className="picandpro-container">
                    {/* Profile picture */}
                    <div className="profile-pic-container">
                        <label style={{ display: 'block', left: '50%', position: 'relative', transform: 'translateX(-50%)', marginBottom: 10 }}>
                            <img className="profile-pic" src={`${localStorage.getItem('url')}${this.state.userData.picture}`} width="200" height="200" align="left" alt=""></img>
                        </label>
                        <input type='file'
                            style={{
                                width: 105,
                                display: 'block',
                                top: 10,
                                left: '50%',
                                position: 'relative',
                                transform: 'translateX(-50%)'
                            }}
                            onChange={this.patchChangePic.bind(this)} />
                    </div>

                    {/* Profile edit data form */}
                    <div className="profile-container">
                        <div>
                            <label className="textheader" style={{ marginLeft: 20 }} > Profile </label>
                            <br /><br />
                            {
                                Object.keys(this.dataForm).map((val) => {
                                    return (
                                        <div key={val}>
                                            <label className="text" style={{ marginLeft: 20 }}> {this.dataForm[val][0]}
                                                < input className='input-text' type={this.dataForm[val][1]} style={{ marginLeft: this.dataForm[val][2] }}
                                                    name={val}
                                                    disabled={!this.state.editableData}
                                                    value={this.state.userData[val]}
                                                    onChange={this.handleDataChange}
                                                >
                                                </input>
                                            </label>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <br />
                        <div className="one-button" onClick={this.editData} >
                            {this.state.editableData === true ? 'Save Profile' : 'Edit'}
                        </div>
                        <br /><br /><br />
                    </div>

                    {/* Profile edit pw form */}
                    <div className="password-container">
                        <label className="textheader" style={{ marginLeft: 20 }}> Password Reset </label>
                        <br /><br />
                        {
                            Object.keys(this.passForm).map((keys) => {
                                return (
                                    <div key={keys}>
                                        <label className="text" style={{ marginLeft: 20 }}> {this.passForm[keys][0]}
                                            <input className="input-password" type="password" style={{ marginLeft: this.passForm[keys][2] }}
                                                name={keys}
                                                disabled={!this.state.editablePassword}
                                                onChange={this.handlePasswordChange}
                                                value={this.state.passwordChange[keys]}
                                            >
                                            </input>
                                        </label>
                                        <br /><br />
                                    </div>
                                )
                            })
                        }
                        <br />
                        <div className="two-button" onClick={this.editPassword}>
                            {this.state.editablePassword === true ? 'Save Password' : 'Reset password'}
                        </div>
                        <br /><br />

                        <div className="two-button" >
                            <Link to='/drinker/party' style={{ textDecoration: 'none', color: 'white' }}>
                                My Party
                            </Link>
                        </div>
                    </div>
                </div>

                {/* USer fav shop */}
                <div className="myfav-main-container" >
                    <div className="myfav-container" >
                        <h5 style={{ marginBottom: "10px" }}> My favourite </h5> {
                            Object.keys(this.state.shopArray).map((i) => {
                                return (
                                    <div key={i}>
                                        <div className="left-container" >
                                            <img className="imgShop"
                                                src={`${localStorage.getItem('url')}${this.state.shopArray[i].picture}`}
                                                alt={this.state.shopArray[i].shop_name}
                                                align="left" />
                                        </div>

                                        <div className="right-container" >
                                            <div style={{ display: "block", width: "315px", float: "left", fontSize: "18px", marginTop: "10px" }}>
                                                {this.state.shopArray[i].shop_name}
                                            </div>

                                            <div style={{ height: "50px" }}>
                                                <img src={require("../../asset/icon/heart2.png")}
                                                    onClick={() => this.deleteFav(this.state.shopArray[i].pk)}
                                                    alt="heart"
                                                    style={{ width: "35px", height: "35px", float: "left", marginTop: "5px", cursor: "pointer" }} />
                                            </div >

                                            <div style={{ display: "block", width: "340px", wordWrap: "break-word", height: "90px", paddingTop: "10px", fontSize: "12px" }}>
                                                {this.state.shopArray[i].detail}
                                            </div>

                                            <div className="detailShop" > location: {this.state.shopArray[i].address} </div>
                                            <div className="detailShop" > contact: {this.state.shopArray[i].phone_number.replace('+66', 0)} </div>
                                            <Link to={`/shop/${this.state.shopArray[i].pk}`}><div className="learnBox" > LEARN MORE </div></Link>
                                        </div>
                                        <hr className="hrcss"
                                            style={{ height: "280px" }}
                                        />
                                    </div >
                                )
                            })
                        } <hr className="hrcss" />
                        <br />
                    </div>
                </div >
            </>
        );
    }
}