import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

import './SignUp-form.css';

const usernameRegex = RegExp(/[a-zA-Z0-9]/)                                     // contain only eng. letter and number
const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)  // contain at least 1 uppercase and 1 lowercase and 1 number and longer than 8 letter
const nameRegex = RegExp(/^[a-zA-Z]+$/)                                         // contain name and surname (only english letter)
const emailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)        // Email format -----@-----.---
const phoneRegex = RegExp(/^[0-9]{10,}$/)                                       // Phone number contain only number and longer than 10


// Validate all form before send request
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
        this.state = {
            form: {
                email: '',
                first_name: '',
                last_name: '',
                username: '',
                password: '',
                password_confirm: '',
                nickname: '',
                birth_date: '',
                phone_number: '',
                address: 'nothing'
            },
            error: {
                username: '',
                password: '',
                password_confirm: '',
                first_name: '',
                last_name: '',
                birth_date: '',
                email: '',
                phone_number: '',
                nickname: '',
            },
            modal: {
                head: '',
                body: '',
                button: '',
                show: false,
                func: null,
            },
            role: 'dk',
            check: false,
            redirect: '',
        }

        // form for map to component
        this.form = {
            username: ['Username', 'text'],
            password: ['Password', 'password'],
            password_confirm: ['Confirm Password', 'password'],
            first_name: ['Name Surname', 'text'],
            birth_date: ['Birth Month', 'month'],
            email: ['Email', 'email',],
            phone_number: ['Phone', 'text', '[0-9]{10,}'],
        }

        this.submit = this.submit.bind(this)
        this.redirect = this.redirect.bind(this)
        this.setModal = this.setModal.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleChange(e) {
        // change state when input to form

        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        const newForm = { ...this.state.form }
        const formError = { ...this.state.error }

        // change value of form and check format by regular expression
        switch (name) {
            case "username":
                formError[name] =
                    usernameRegex.test(value)
                        ? ""
                        : "Username must be letter or number.";
                newForm["nickname"] = value;
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
                        : "Password & Confirm password must be the same.";
                break;
            case "first_name":
                let [Name, Surname] = value.split(' ')
                formError[name] =
                    nameRegex.test(Name) && nameRegex.test(Surname) && Surname
                        ? ""
                        : "Invalid name or surname.";

                newForm["first_name"] = Name;
                newForm["last_name"] = Surname;
                break;
            case "birth_date":
                let date = new Date();
                let [year, month] = value.split('-');
                value = value.concat('-01');
                formError[name] =
                    parseInt(year) <= parseInt(date.getFullYear()) && parseInt(month) <= parseInt(date.getMonth() + 1)
                        ? ""
                        : "Date must be the past.";
                break;
            case "email":
                formError[name] =
                    emailRegex.test(value)
                        ? ""
                        : "Invalid Email.";
                break;
            case "phone_number":
                formError[name] =
                    phoneRegex.test(value)
                        ? ""
                        : "Phone number must contain only number (only Thai phone number).";
                break;
            case "nickname":
                formError[name] =
                    value.length > 0
                        ? ""
                        : "Display name can't be empty."
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
        // change state when agree or disagree with term & cond.
        this.setState({
            check: e.target.checked
        });
    }

    handleSelect(e) {
        // change state when select role of account
        this.setState({
            role: e.target.value
        })
    }

    setModal(head, body, button, func) {
        // function for set modal popup text and style
        let newModal = { ...this.state.modal }

        newModal.head = head
        newModal.body = body
        newModal.button = button
        newModal.show = true
        newModal.func = func

        this.setState({
            modal: newModal
        })
    }

    toggleModal() {
        // function for show or hide modal popup
        let newModal = { ...this.state.modal }

        newModal.show = !this.state.modal.show
        this.setState({
            modal: newModal
        })
    }

    redirect() {
        // redirect to other page
        this.setState({ redirect: '/login' })
    }

    submit(event) {
        // * submit form
        event.preventDefault();
        // * validate that form is valid and agree with term and cond.
        if (validateForm(this.state) && this.state.check) {
            const url = localStorage.getItem('url');

            // change raw data to formData
            const sentForm = new FormData();
            const path = this.state.role === 'dk' ? '/user/profile/' : this.state.role === 'ow' ? '/owner/profile/' : '9999';
            const newForm = this.state.form
            newForm.phone_number = newForm.phone_number.replace(/^0/, '+66');
            for (let value of Object.entries(newForm)) {
                sentForm.append(value[0], value[1]);
            }

            // send request
            Axios.post(`${url + path}`, sentForm)
                .then((res) => {
                    // set modal popup to interact with user
                    this.setModal('Sign up success', 'You re going to Login page', 'success', this.redirect)
                })
                .catch((err) => {
                    // set modal popup to interact with user
                    this.setModal('Error', Object.values(err.response.data), 'danger', this.toggleModal)
                })
        }
        // ! User dont agree with term and cond.
        else if (!this.state.check) {
            // set modal popup to interact with user
            this.setModal('Error', 'Please read Term of Service and Privacy Notice.', 'danger', this.toggleModal)
        }
        // ! smth in form is error.
        else {
            let getError = false;
            for (let key of Object.entries(this.state.error)) {
                if (key[1].length > 0) {
                    getError = true
                    this.setModal('Error', key[1], 'danger', this.toggleModal)
                    break;
                }
            }
            if(!getError){
                this.setModal('Error', 'Form can\'t be empty.', 'danger', this.toggleModal)
            }
        }
    }

    showModal() {
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

    render() {
        // redirect
        if (this.state.redirect) {
            return (<Redirect to={this.state.redirect} />)
        }

        // style for set component at middle in horizontal
        const xMid = {
            left: '50%',
            position: 'relative',
            transform: 'translateX(-50%)'
        }

        // term and condition of web
        const term = <a href="">Term of Service</a>
        const condition = <a href="">Privacy Notice</a>

        return (
            <div className="sign-up-form-container">

                {/* Modal (Popup when user interact with signup page) */}
                {this.showModal()}

                <Form className="sign-up-wrapper" onSubmit={this.submit}>
                    <h3>Sign-up</h3>
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
                        <Form.Label column sm={3}>Who are you?</Form.Label>
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