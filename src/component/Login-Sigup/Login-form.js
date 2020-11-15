import React from 'react';
import './Login-form.css';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';

// validate username and password
const validateForm = ({ error, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(error).forEach(val => {
        val.length !== 0 && (valid = false)
    });

    return valid;
};

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: null,
            error: {
                username: '',
                password: '',
            },
            modal: {
                show: false,
                head: '',
                body: '',
                func: '',
                button: '',
            }
        }

        this.submit = this.submit.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        // change state of username and password
        const name = e.target.name;
        const value = e.target.value;
        const formError = { ...this.state.error }

        switch (name) {
            case "username":
                formError[name] =
                    value.length > 0
                        ? ""
                        : "Invalid Username";
                break;
            case "password":
                formError[name] =
                    value.length > 0
                        ? ""
                        : "Invalid Password";
                break;
            default:
        }

        this.setState({
            [name]: value,
            error: formError
        });
    }

    toggleModal() {
        // toggle on-off modal
        const modal = this.state.modal

        modal.show = !modal.show
        this.setState({
            modal: modal
        })
    }

    submit(event) {
        event.preventDefault();

        // ! change raw data to form data
        const login = new FormData()
        login.append('username', this.state.username);
        login.append('password', this.state.password);

        // Check form is valid
        if (validateForm(this.state)) {
            Axios.post(`${localStorage.getItem('url')}/login/token/`, login)
                .then((res) => {
                    // * store token in localStorage
                    localStorage.setItem('access', res.data.access);
                    localStorage.setItem('refresh', res.data.refresh);
                    localStorage.setItem('role', res.data.role);

                    // set path to redirct for each role
                    if (res.data.role === 'dk') {
                        this.setState({
                            redirect: "/"
                        })
                    }
                    else if (res.data.role === 'sm') {
                        Axios.get(`${localStorage.getItem('url')}/manager/profile/my_profile/`, { headers: { Authorization: `Bearer ${res.data.access}` } })
                            .then((res) => {
                                this.setState({
                                    redirect: `/shop/${res.data.related_shop.shop_id}`
                                })
                                this.props.auth();
                            }).bind(this)
                    }
                    else if (res.data.role === 'ow') {
                        this.setState({
                            redirect: `/owner`
                        })
                    }

                    // change App.js state to authenticated
                    this.props.auth();
                })
                .catch((error) => {
                    // error when loggedin
                    if (localStorage.getItem('role') !== 'sm')
                        this.setState({
                            modal: {
                                show: true,
                                head: 'Error',
                                body: 'Your username or password are invalid.',
                                func: this.toggleModal,
                                button: 'danger'
                            }
                        })
                })
        }
        else {
            // toggle error modal
            this.setState({
                modal: {
                    show: true,
                    head: 'Error',
                    body: 'Your username or password are invalid.',
                    func: this.toggleModal,
                    button: 'danger'
                }
            })
        }
    }

    render() {
        // arrange item middle in x axis
        let xMid = {
            display: 'flex',
            justifyContent: 'center'
        }

        // redirect
        if (this.state.redirect) {
            return (<Redirect to={this.state.redirect} />)
        }

        return (
            <div className="login-form-container">
                {/* Modal */}
                <Modal show={this.state.modal.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modal.head}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{this.state.modal.body}</Modal.Body>

                    <Modal.Footer>
                        <Button variant={this.state.modal.button} onClick={this.state.modal.func}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Form className="login-form-wrapper" onSubmit={this.submit}>
                    <h2 style={xMid}>DRINK</h2>

                    {/* Username */}
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
                                isInvalid={this.state.error.username}
                            />
                            <Form.Control.Feedback type="valid">{this.state.error.username}</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{this.state.error.username}</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group as={Row} controlId="formPassword">
                        <Form.Label column sm="3">
                            Password
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                isInvalid={this.state.error.password}
                            />
                            <Form.Control.Feedback type="valid">{this.state.error.password}</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{this.state.error.password}</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* Link to reset password */}
                    <Link to="/reset" style={{ display: 'inline', float: 'right' }}>Forgot your password ?</Link>
                    <br />
                    <br />

                    {/* Login */}
                    <Button size="lg" type="submit" style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '100%' }} >Login</Button>
                    <br />
                    <br />
                    <br />

                    {/* Link to signup */}
                    <div style={xMid}>
                        <div style={{ display: 'inline' }}>Don't have an account?&nbsp;</div>
                        <Link to="/signup" style={{ display: 'inline' }}>Create Account</Link>
                    </div>
                </Form>
            </div>
        )
    }
}