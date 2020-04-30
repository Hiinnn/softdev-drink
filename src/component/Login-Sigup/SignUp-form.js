import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './SignUp-form.css';
import Axios from 'axios';

const usernameRegex = RegExp(/[a-zA-Z0-9]{8,}/)              // contain at least 1 uppercase and 1 lowercase
const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)  // contain at least 1 uppercase and 1 lowercase and 1 number
const nameRegex = RegExp(/^[a-zA-Z]+$/)                                         // contain name and surname (only english letter)
const emailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)      // Email format -----@-----.---
const phoneRegex = RegExp(/^[0-9]{8,}$/)                                           // Phone number contain only number

const validateForm = ({ error, form }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(error).forEach(val => {
        val !== null && val.length !== 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(form).forEach(val => {
        val.length === 0 && (valid = false);
    });
    return valid;
};

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.form = {
            username: ['Username', 'text', ''],
            password: ['Password', 'password', ''],
            password_comfirm: ['Confirm Password', 'password', ''],
            first_name: ['Name', 'text', ''],
            nickname: ['Nickname', 'text', ''],
            birth_date: ['Birth Month', 'month', ''],
            email: ['Email', 'email', ''],
            phone_number: ['Phone', 'text', '[0-9]{8,10}'],
        }

        this.state = {
            form: {
                first_name: '',
                last_name: '',
                username: '',
                password: '',
                password_confirm: '',
                birth_date: '',
                phone_number: '',
                nickname: '',
            },
            error: {
                username: '',
                password: '',
                password_comfirm: '',
                first_name: '',
                last_name: '',
                birth_date: '',
                email: '',
                phone_number: '',
            },
            role: 'dk',
            check: true,
        }

        this.submit = this.submit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        const newForm = { ...this.state.form }
        const formError = { ...this.state.error }

        switch (name) {
            case "username":
                formError[name] =
                    usernameRegex.test(value)
                        ? ""
                        : "Username must be longer than 8 characters.";
                break;
            case "password":
                formError[name] =
                    passwordRegex.test(value)
                        ? ""
                        : "Password must be longer than 8 characters and contain at least 1 uppercase, 1 lower case and 1 number.";
                break;
            case "password_comfirm":
                formError[name] =
                    value === this.state.form.password
                        ? ""
                        : "Password & Confirm password must be the same";
                break;
            case "first_name":
                let [Name, Surname] = value.split(' ')
                formError[name] =
                    nameRegex.test(Name) && nameRegex.test(Surname) && Surname
                        ? ""
                        : "Invalid name or surname";

                newForm["first_name"] = Name;
                newForm["lase_name"] = Surname;
                break;
            case "birth_date":
                let date = new Date();
                let [year, month] = value.split('-');
                value = value.concat('-01');
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
            case "phone_number":
                formError[name] =
                    phoneRegex.test(value) && value[0] === '0'
                        ? ""
                        : "Phone number must contain only number (only Thai phone number)";
                if (value[0] === "0" && this.state.form.phone_number[0] !== "+") {
                    value = '+66'.concat(this.state.form.phone_number.slice(1))
                }
                break;
            default:
                break;
        }

        newForm[name] = value;

        this.setState({
            form: newForm,
            error: formError
        });
    }

    handleCheck(e) {
        this.setState({
            check: e.target.checked
        });
    }

    handleSelect(e) {
        this.setState({
            role: e.target.value
        })
    }

    submit(event) {
        event.preventDefault();

        if (validateForm(this.state) && this.state.check) {
            const sentForm = new FormData();            // change raw data to form
            Object.keys(this.state.form).map((key) => {
                sentForm.append(key, this.state.form[key]);
            })
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
                            return (
                                <Form.Group as={Row} key={"form" + key} controlId={"form" + key}>
                                    <Form.Label column sm={3}>{this.form[key][0]}</Form.Label>
                                    <Col>
                                        <Form.Control as='input'
                                            name={key}
                                            type={this.form[key][1]}
                                            pattern={this.form[key][2]}
                                            size="sm"
                                            value={this.state.form[i]}
                                            onChange={this.handleChange}
                                            isInvalid={this.state.error[key]}
                                            isValid={this.state.form[key] && !this.state.error[key]}
                                        />
                                        <Form.Control.Feedback type="valid">{this.state.error[key]}</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">{this.state.error[key]}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            );
                        })
                    }

                    {/* Choose Role */}
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>Choose Role</Form.Label>
                        <Col>
                            <div className="form-inline" id={'form'}>
                                <select className="custom-select my-1 mr-sm-2 form-control-lg"
                                    id="inlineFormCustomSelectPref"
                                    onChange={this.handleSelect}
                                    style={{ textAlign: "center", textAalignLast: "center" }}>
                                    <option value="dk">Drinker</option>
                                    <option value="ow">Owner</option>
                                </select>
                            </div>
                        </Col>
                    </Form.Group>


                    {/* Checkbox term and condition */}
                    <Form.Group>
                        <Form.Check
                            type='checkbox'
                            inline={true}
                            name="check"
                            onChange={this.handleCheck}
                            checked={this.state.form.check}
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