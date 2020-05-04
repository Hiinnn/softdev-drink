import React from 'react'
import './Login-form.css'
import './Reset-password.css'

import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            otp_code: '',
            redirect: null,
            page: 'get',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getOtp(e) {
        e.preventDefault()
        console.log(this.state.username);

        const url = `${localStorage.getItem('url')}/reset/password/?username=${this.state.username}`

        Axios.get(url)
            .then((res) => {
                console.log(res)
                this.setState({
                    page: 'submit'
                })
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    postOTP(e) {
        e.preventDefault()
        console.log(this.state.username);

        const url = `${localStorage.getItem('url')}/reset/password/?username=${this.state.username}`
        const body = {
            username: this.state.username,
            otp_code: this.state.otp_code
        }

        Axios.post(url, body)
            .then((res) => {
                console.log(res)
                this.setState({
                    page: 'finish',
                })
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    redirect() {
        this.setState({
            redirect: '/login'
        })
    }

    pageGetOTP() {
        let xMid = {        // arrange item middle in x axis
            display: 'flex',
            justifyContent: 'center'
        }

        return (
            <div className="login-form-container">
                <Form className="login-form-wrapper" onSubmit={this.submit}>
                    <h2 style={xMid}>Reset Password</h2>
                    <br />
                    <Form.Group as={Row} controlId="formUsername">
                        <Form.Label column sm="3">
                            Username
                    </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                name="username"
                                onChange={this.handleChange}
                                value={this.state.username}
                            />
                        </Col>
                    </Form.Group>

                    <br />
                    <Button size="lg" type="submit" style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '100%' }} onClick={this.getOtp.bind(this)}>Get OTP</Button>
                    <br />
                    <br />
                </Form>
            </div>
        )
    }

    pageSubmit() {
        let xMid = {        // arrange item middle in x axis
            display: 'flex',
            justifyContent: 'center'
        }

        return (
            <div className="login-form-container">
                <Form className="login-form-wrapper" onSubmit={this.submit}>
                    <h2 style={xMid}>Reset Password</h2>
                    <br />
                    <Form.Group as={Row} controlId="formPassword">
                        <Form.Label column sm="3">
                            OTP
                    </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                name="otp_code"
                                onChange={this.handleChange}
                                value={this.state.otp_code}
                            />
                        </Col>
                    </Form.Group>

                    <Link to="/reset" style={{ display: 'inline', float: 'right' }} onClick={this.getOtp.bind(this)}>Doesn't get OTP ?</Link>
                    <br />
                    <br />

                    <Button size="lg" type="submit" style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '100%' }} onClick={this.postOTP.bind(this)} >Submit</Button>
                    <br />
                    <br />
                </Form>
            </div>
        )
    }

    pageFinish() {
        return (
            <Modal show={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Finish</Modal.Title>
                </Modal.Header>

                <Modal.Body>New password in your e-mail.</Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={this.redirect.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to={this.state.redirect} />)
        }

        if (this.state.page === 'get')
            return this.pageGetOTP()
        else if (this.state.page === 'submit')
            return this.pageSubmit()
        else if (this.state.page === 'finish')
            return this.pageFinish
    }
}