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
            modal: {
                show: false,
                head: '',
                body: '',
                func: '',
                button: '',
            }
        }
        this.redirect = this.redirect.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        // ? Change state when user input
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getOtp(e) {
        // ? User request otp to email
        e.preventDefault()
        const url = `${localStorage.getItem('url')}/reset/password/?username=${this.state.username}`

        Axios.get(url)
            .then((res) => {
            })
            .catch((err) => {
            })

        this.setState({
            page: 'submit'
        })
    }

    postOTP(e) {
        // ? user enter otp to server
        e.preventDefault()
        const url = `${localStorage.getItem('url')}/reset/password/?username=${this.state.username}`
        const body = {
            username: this.state.username,
            otp_code: this.state.otp_code
        }

        Axios.post(url, body)
            .then((res) => {
                // set modal and set state
                this.setState({
                    page: 'finish',
                    modal: {
                        show: true,
                        head: 'Success',
                        body: 'New password is in your email.',
                        func: this.redirect,
                        button: 'success'
                    }
                })
            })
            .catch((err) => {
                // set error modal
                this.setState({
                    modal: {
                        show: true,
                        head: 'Error',
                        body: 'Your OTP is invalid.',
                        func: this.toggleModal,
                        button: 'danger'
                    }
                })
            })
    }

    pageGetOTP() {
        // * User enter username page

        // style arrange item middle in x axis
        let xMid = {
            display: 'flex',
            justifyContent: 'center'
        }

        return (
            <div className="login-form-container">
                <Form className="login-form-wrapper" onSubmit={this.submit}>
                    <h2 style={xMid}>Reset Password</h2>
                    <br />

                    {/* Input Username  */}
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

                    {/* Submit button */}
                    <Button size="lg"
                        type="submit"
                        style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '100%' }}
                        onClick={this.getOtp.bind(this)}>
                        Get OTP
                    </Button>
                    <br />
                    <br />
                </Form>
            </div>
        )
    }

    pageSubmit() {
        // * user already enter username and will submit the otp
        let xMid = {
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

    showModal() {
        // * Modal popup that use for interact to user
        return (
            <Modal show={this.state.modal.show}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modal.head}</Modal.Title>
                </Modal.Header>

                <Modal.Body>{this.state.modal.body}</Modal.Body>

                <Modal.Footer>
                    <Button variant={this.state.modal.button} onClick={this.state.modal.func}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    redirect() {
        // redirect when finish
        this.setState({
            redirect: '/login'
        })
    }

    toggleModal() {
        // toggle on-off modal
        const modal = this.state.modal

        modal.show = !modal.show
        this.setState({
            modal: modal
        })
    }

    render() {
        // ? Redirect
        if (this.state.redirect) {
            return (<Redirect to={this.state.redirect} />)
        }

        if (this.state.page === 'get')
            return this.pageGetOTP()
        else if (this.state.page === 'submit')
            return (
                <>
                    {this.pageSubmit()}
                    {this.showModal()}
                </>
            )
        else if (this.state.page === 'finish')
            return this.showModal()
    }
}