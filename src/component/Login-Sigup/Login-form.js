import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './Login-form.css';

const validateForm = ({ error, ...rest }) => {
    let valid = true;
    
    // validate form errors being empty
    Object.values(error).forEach(val => {
        val.length !== 0 && (valid = false)
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val.length === 0 && (valid = false)
    });
    

    return valid;
};

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: '',
            error: {
                username: '',
                password: '',
            }
        }

        this.submit = this.submit.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
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

    handleCheck(e) {
        this.setState({
            remember: e.target.checked,
        });
    }

    submit(event) {
        event.preventDefault();

        if (validateForm(this.state) && this.state.remember) {
            console.log('nice');
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

                    <Form.Check
                        type="checkbox"
                        name="check"
                        inline={true}
                        label="Remember me"
                        onChange={this.handleCheck}
                        checked={this.state.remember} />
                    <a href="eiei" style={{ display: 'inline', float: 'right' }}>Forgot your password ?</a>
                    <br />
                    <br />

                    <Button size="lg" type="submit" style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '100%' }} >Login</Button>

                    <br />
                    <br />
                    <br />
                    <div style={xMid}>
                        <div style={{ display: 'inline' }}>Don't have an account?&nbsp;</div>
                        <a href="eiei" style={{ display: 'inline' }}>Create Account</a>
                    </div>
                </Form>
            </div>
        )
    }
}