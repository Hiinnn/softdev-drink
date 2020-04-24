import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './SignUp-form.css';

const usernameRegex = RegExp(/(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}/)              // contain at least 1 uppercase and 1 lowercase
const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,10}$/)  // contain at least 1 uppercase and 1 lowercase and 1 number
const nameRegex = RegExp(/^[a-zA-Z]+$/)                                         // contain name and surname (only english letter)
const emailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)      // Email format -----@-----.---
const phoneRegex = RegExp(/^[0-9]{8,}$/)                                           // Phone number contain only number

const validateForm = ({ error, ...rest }) => {
    let valid = true;


    // validate form errors being empty
    Object.values(error).forEach(val => {
        val !== null && val.length !== 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val.length === 0 && (valid = false);
    });

    return valid;
};

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.form = {
            username: ['Username', 'text', 'Enter Username'],
            password: ['Password', 'password', 'Enter Password'],
            comfirm: ['Confirm Password', 'password', 'Confirm Password'],
            name: ['Name', 'text', 'Enter Name and Surname'],
            birth: ['Birth Month', 'month', ''],
            email: ['Email', 'email', 'Enter Email'],
            phone: ['Phone', 'text', 'Enter Phone Number', '[0-9]{8,10}']
        }
        this.state = {
            username: '',
            password: '',
            comfirm: '',
            name: '',
            birth: '',
            email: '',
            phone: '',
            check: false,
            error: {
                username: '',
                password: '',
                comfirm: '',
                name: '',
                birth: '',
                email: '',
                phone: '',
            }
        }

        this.submit = this.submit.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        const formError = { ...this.state.error }

        switch (name) {
            case "username":
                formError[name] =
                    usernameRegex.test(value)
                        ? ""
                        : "Username must be longer than 8 characters and contain at least 1 uppercase letter(s).";
                break;
            case "password":
                formError[name] =
                    passwordRegex.test(value)
                        ? ""
                        : "Password must be longer than 8 characters and contain at least 1 uppercase, 1 lower case and 1 number.";
                break;
            case "comfirm":
                formError[name] =
                    value === this.state.password
                        ? ""
                        : "Password & Confirm password must be the same";
                break;
            case "name":
                let [Name, Surname] = value.split(' ')
                formError[name] =
                    nameRegex.test(Name) && nameRegex.test(Surname) && Surname
                        ? ""
                        : "Invalid name or surname";
                break;
            case "birth":
                let date = new Date()
                let [year, month] = value.split('-')

                formError[name] =
                    parseInt(year) <= parseInt(date.getFullYear()) && parseInt(month) <= parseInt(date.getMonth() + 1)
                        ? ""
                        : "Date must be the past";
                break;
            case "email":
                formError[name] =
                    emailRegex.test(value)
                        ? ""
                        : "Invalid Email";
                break;
            case "phone":
                formError[name] =
                    phoneRegex.test(value) && value[0] === '0'
                        ? ""
                        : "Phone number must contain only number (only Thai phone number)";
                if (value[0] === "0" && this.state.phone[0] !== "+") {
                    value = '+66'.concat(this.state.phone.slice(1))
                }
                break;
            case "check":
                formError[name] = value;
                break;
            default:
                break;
        }

        this.setState({
            [name]: value,
            error: formError
        });

        console.log(this.state.phone);

    }

    handleCheck(e) {
        this.setState({
            check: e.target.checked,
        });
    }

    submit(event) {
        event.preventDefault();

        if (validateForm(this.state) && this.state.check) {
            console.log('nice');
        }
        else {
            console.log('fuckr');
        }
    }

    render() {
        let xMid = {
            left: '50%',
            position: 'relative',
            transform: 'translateX(-50%)'
        }

        let term = <a href="eiei">term</a>
        let condition = <a href="eiei">condition</a>

        return (
            <div className="sign-up-form-container">
                <Form className="sign-up-wrapper" onSubmit={this.submit}>
                    <h3>Sign up</h3>
                    <br />
                    {
                        // Loop create form
                        Object.keys(this.form).map((key, i) => {
                            console.log(this.state.error[key]);
                            return (
                                <Form.Group as={Row} key={"form" + key} controlId={"form" + key}>
                                    <Form.Label column sm={3}>{this.form[key][0]}</Form.Label>
                                    <Col>
                                        <Form.Control as='input'
                                            name={key}
                                            type={this.form[key][1]}
                                            // placeholder={this.form[key][2]}
                                            pattern={this.form[key][3]}
                                            size="sm"
                                            value={this.state[i]}
                                            onChange={this.handleChange}
                                            isInvalid={this.state[key].length > 0 && this.state.error[key]}
                                            isValid={this.state[key].length > 0 && !this.state.error[key]}
                                        />
                                        <Form.Control.Feedback type="valid">{this.state.error[key]}</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">{this.state.error[key]}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            );
                        })
                    }

                    {/* Checkbox term and condition */}
                    <Form.Group>
                        {/* <Form.Check as="input" */}
                        <Form.Check
                            type='checkbox'
                            inline={true}
                            name="check"
                            onChange={this.handleCheck}
                            checked={this.state.check}
                        />
                        <div style={{ display: 'inline' }}>By signing I agree with {term} and {condition}</div>
                    </Form.Group>

                    {/* Sign-up button */}
                    <Button size="lg" type="submit" style={xMid}>Sign-up</Button>
                </Form>
            </div>
        )
    }
}