import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './Login-form.css';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

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
            }
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
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
        }

        this.setState({
            [name]: value,
            error: formError
        });
    }

    submit(event) {
        event.preventDefault();

        const login = new FormData()

        login.append('username', this.state.username);
        login.append('password', this.state.password);

        if (validateForm(this.state)) {
            Axios.post(`${localStorage.getItem('url')}/login/token/`, login)
                .then((res) => {
                    localStorage.setItem('access', res.data.access);
                    localStorage.setItem('refresh', res.data.refresh);
                    localStorage.setItem('role', res.data.role);

                    this.setState({
                        redirect: "/"
                    })
                    
                    this.props.auth();
                })
                .catch((error) => {
                    
                })
        }
        else {
            console.log('fuckr');
        }
    }

    render() {
        let xMid = {        // arrange item middle in x axis
            display: 'flex',
            justifyContent: 'center'
        }

        if (this.state.redirect) {
            return (<Redirect to={this.state.redirect} />)
        }
        return (
            <div className="login-form-container">
                <Form className="login-form-wrapper" onSubmit={this.submit}>
                    <h2 style={xMid}>DRINK</h2>
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

                    <Link to="/home" style={{ display: 'inline', float: 'right' }}>Forgot your password ?</Link>
                    <br />
                    <br />

                    <Button size="lg" type="submit" style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '100%' }} >Login</Button>
                    <br />
                    <br />
                    <br />
                    <div style={xMid}>
                        <div style={{ display: 'inline' }}>Don't have an account?&nbsp;</div>
                        <Link to="/signup" style={{ display: 'inline' }}>Create Account</Link>
                    </div>
                </Form>
            </div>
        )
    }
}