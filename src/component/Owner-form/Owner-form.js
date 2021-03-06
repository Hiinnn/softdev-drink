import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import './Owner-form.css';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { NotifyAlert } from '../SweetAlert';

const usernameRegex = RegExp(/[a-zA-Z0-9]/)                                     // contain at least 1 uppercase and 1 lowercase
const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)  // contain at least 1 uppercase and 1 lowercase and 1 number
const nameRegex = RegExp(/^[a-zA-Z]+$/)                                         // contain name and surname (only english letter)
const emailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)        // Email format -----@-----.---
const phoneRegex = RegExp(/^[0-9]{10,}$/)                                       // Phone number contain only number
const maxseatRegex = RegExp(/^[0-9]*$/)                                         // Number only
const pictureRegex = RegExp(/(.jpg|.jpeg|.png)$/)                               // Picture only


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

export default class Ownerform extends React.Component {
    constructor(props) {
        super(props)

        this.form = {
            username: ['Shop Username', 'text', ''],
            password: ['Shop Password', 'password', ''],
            password_confirm: ['Confirm Password', 'password', ''],
            max_seat: ['Max Seat', 'text', ''],
            shop_name: ['Shop Name', 'text', ''],
            address: ['Address', 'text', ''],
            phone_number: ['Phone', 'text', '[0-9]{8,10}'],
            detail: ['Detail', 'text', ''],
            email: ['Email', 'email',],
        }

        this.state = {
            form: {
                username: '',
                first_name: 'nope',
                last_name: 'nope',
                email: '',
                password: '',
                password_confirm: '',
                max_seat: '',
                shop_name: '',
                address: '',
                timezone: 'Asia/Bangkok',
                phone_number: '',
                detail: '',
            },
            error: {
                username: '',
                password: '',
                password_confirm: '',
                max_seat: '',
                shop_name: '',
                address: '',
                phone_number: '',
                detail: '',
            },
        }

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // ! change state when enter data
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
                        : "Username must be english letter or number.";
                break;

            case "picture":
                formError[name] =
                    pictureRegex.test(value)
                        ? ""
                        : "Invalid (Only jpg, jpeg and png)";
                break;

            case "email":
                formError[name] =
                    emailRegex.test(value)
                        ? ""
                        : "Invalid Email";
                break;

            case "password":
                formError[name] =
                    passwordRegex.test(value)
                        ? ""
                        : "Password must be longer than 8 characters and contain at least 1 uppercase, 1 lower case and 1 number.";
                break;

            case "password_confirm":
                formError[name] =
                    value === this.state.form.password
                        ? ""
                        : "Password & Confirm password must be the same";
                break;

            case "max_seat":
                formError[name] =
                    maxseatRegex.test(value)
                        ? ""
                        : "Max seat must be only number";
                break;
            case "shop_name":
                break;
            case "address":
                break;
            case "phone_number":
                formError[name] =
                    phoneRegex.test(value)
                        ? ""
                        : "Phone number must contain only number (only Thai phone number)";
                break;
            case "name":
                let [Name, Surname] = value.split(' ')
                formError[name] =
                    nameRegex.test(Name) && nameRegex.test(Surname) && Surname
                        ? ""
                        : "Invalid name or surname";
                newForm["first_name"] = Name;
                newForm["last_name"] = Surname;
                break;

            case "detail":
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


    submit(event) {
        event.preventDefault();

        if (validateForm(this.state)) {
            const newForm = this.state.form
            newForm.phone_number = newForm.phone_number.replace(/^0/, '+66');

            const sentForm = new FormData();            // change raw data to form
            for (let value of Object.entries(newForm)) {
                sentForm.append(value[0], value[1]);
            }

            const url = `${localStorage.getItem('url')}/owner/build_shop/`
            const head = {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }

            Axios.post(url, sentForm, { headers: head })
                .then((res) => {
                    setTimeout(() => {
                        this.setState({
                            redirect: '/owner'
                        })
                    }, 1000)
                    NotifyAlert(() => { }, 'สำเร็จ!', '', 'success');
                })
                .catch((err) => {
                })
        }
        else {
            NotifyAlert(() => { }, 'เกิดข้อผิดพลาด!', 'กรุณากรอกข้อมูลให้ครบ', 'error');
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="owner-form-container">
                <Form className="form-wrapper" onSubmit={this.submit}>
                    <h3>Create New Shop</h3>
                    <br />
                    {
                        // Loop create form
                        Object.keys(this.form).map((key, i) => {
                            return (
                                <Form.Group as={Row} key={"form" + key} controlId={"form" + key}>
                                    <Form.Label column sm={4}>{this.form[key][0]}</Form.Label>
                                    <Col>
                                        <Form.Control as='input'
                                            className="control"
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

                    {/* Save button */}
                    <div className="button" onClick={this.submit}> Create </div>

                </Form>
            </div>
        )
    }
}
