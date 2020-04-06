import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './Login-form.css';

export default class LoginForm extends React.Component {
    render() {
        let xMid = {        // arrange item middle in x axis
            display: 'flex',
            justifyContent: 'center'
        }

        return (
            <div className="login-form-container">
                <Form className="login-form-wrapper">
                    <h2 style={xMid}>DRINK</h2>

                    <Form.Group as={Row} controlId="formUsername">
                        <Form.Label column sm="3">
                            Username
                        </Form.Label>
                        <Col column>
                            <Form.Control type="text" placeholder="eiei" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPassword">
                        <Form.Label column sm="3">
                            Password
                        </Form.Label>
                        <Col column>
                            <Form.Control type="text" placeholder="eiei" />
                        </Col>
                    </Form.Group>

                    <Form.Check type="checkbox" inline={true} label="Remember me" />
                    <a href="#" style={{ display: 'inline', float: 'right' }}>Forgot your password ?</a>
                    <br />
                    <br />

                    <Button style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: '100%' }} size="lg">Login</Button>

                    <br />
                    <br />
                    <br />
                    <div style={xMid}>
                        <div style={{ display: 'inline' }}>Don't have an account?&nbsp;</div>
                        <a href="#" style={{ display: 'inline' }}>Create Account</a>
                    </div>
                </Form>
            </div>
        )
    }
}