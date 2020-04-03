import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './SignUp-form.css';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.form = {
            Username: ['text', 'Enter Username'],
            Password: ['password', 'Enter password'],
            "Comfirm Password": ['password', 'Confirm password'],
            Name: ['text', 'Enter name'],
            Gender: 'text',
            "Date of birth": ['date', ''],
            Email: ['email', 'Enter email'],
            Mobile: ['tel', '1234567890', '[0-9]{10}']
        }
    }
    render() {
        let xMiddleStyle = {
            left: '50%',
            position: 'relative',
            transform: 'translateX(-50%)'
        }

        let yMiddleStyle = {
            top: '50%',
            position: 'relative',
            transform: 'translateY(-50%)',
            marginRight: '5px'
        }

        let term = <a href="#">term</a>
        let condition = <a href="#">condition</a>

        return (
            <div className="sign-up-wrapper">
                <Form className="sign-up-form-container">
                    {
                        // Loop create form
                        Object.keys(this.form).map((key) => {
                            let formControl;

                            // check for Gender
                            if (key === 'Gender') {
                                formControl =
                                    <Col>
                                        <Form.Check type='radio' label='Male' inline={true} style={yMiddleStyle} name='genderRadio' />
                                        <img src={require('../../asset/SignUp/male.svg')} width="15px" height="15px" style={{ marginTop: '10px', marginRight: '10px' }} />
                                        <Form.Check type='radio' label='Female' inline={true} style={yMiddleStyle} name='genderRadio' />
                                        <img src={require('../../asset/SignUp/female.svg')} width="15px" height="15px" style={{ marginTop: '10px' }} />
                                    </Col>
                            }
                            // else -> normal form
                            else {
                                formControl =
                                    <Col>
                                        <Form.Control as='input' type={this.form[key][0]} placeholder={this.form[key][1]} pattern={this.form[key][2]} />
                                    </Col>
                            }

                            return (
                                <Form.Group as={Row} controlId={"form" + key} className="test">
                                    <Form.Label column sm={3}>{key}</Form.Label>
                                    {formControl}
                                </Form.Group>
                            );
                        })
                    }

                    {/* Checkbox term and condition */}
                    <Form.Group>
                        <Form.Check type='checkbox' inline={true} />
                        <div style={{ display: 'inline' }}>By signing I agree with {term} and {condition}</div>
                    </Form.Group>

                    {/* Sign-up button */}
                    <Button size="lg" type="submit" style={xMiddleStyle}>Sign-up</Button>
                </Form>
            </div>
        )
    }
}