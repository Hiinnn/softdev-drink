import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './Owner-form.css';

const usernameRegex = RegExp(/[a-zA-Z0-9]{8,}/)              // contain at least 1 uppercase and 1 lowercase
const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)  // contain at least 1 uppercase and 1 lowercase and 1 number
const nameRegex = RegExp(/^[a-zA-Z]+$/)                                         // contain name and surname (only english letter)
const emailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)      // Email format -----@-----.---
const phoneRegex = RegExp(/^[0-9]{8,}$/)                                           // Phone number contain only number
const maxseatRegex = RegExp(/^[0-9]*$/)
const pictureRegex = RegExp(/(.jpg|.jpeg|.png)$/)

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
            username: ['Username', 'text', ''],
            picture: ['Picture','file', ''],
            name: ['Name', 'text', ''],
            email: ['Email', 'email', ''],
            password: ['Password', 'password', ''],
            password_comfirm: ['Confirm Password', 'password', ''],
            max_seat: ['Max Seat', 'text', ''],
            shop_name: ['Shop Name', 'text', ''],
            address: ['Address', 'text', ''],
            phone_number: ['Phone', 'text', '[0-9]{8,10}'],
            detail: ['Detail','text', ''],
        }

        this.state = {
            form: {
                username: '',
                picture: '',
                name: '',
                email: '',
                password: '',
                password_comfirm: '',
                max_seat: '',
                shop_name: '',
                address: '',
                phone_number: '',
                detail: '',
            },
            error: {
                username: '',
                picture: '',
                name: '',
                email: '',
                password: '',
                password_comfirm: '',
                max_seat: '',
                shop_name: '',
                address: '',
                phone_number: '',
                detail: '',
            },
            role: 'ow',
            check: true,
            timezone: 'Asia/Bangkok',
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

            case "password_comfirm":
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
                    phoneRegex.test(value) && value[0] === '0'
                        ? ""
                        : "Phone number must contain only number (only Thai phone number)";
                if (value[0] === "0" && this.state.form.phone_number[0] !== "+") {
                    value = '+66'.concat(this.state.form.phone_number.slice(1))
                }
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
            console.log('xxx');
        }
    }

    render() {

        /*let xMid = {
            left: '50%',
            position: 'relative',
            transform: 'translateX(-50%)'
        }*/

        let term = <a href="eiei">term</a>
        let condition = <a href="eiei">condition</a>

        return (
            <div className="owner-form-container">

                <Form className = "form-wrapper" onSubmit={this.submit}>
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
                                            className = "control"
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
                                
                                    {/*<input type="file" accept="image/*"></input>*/}                         
                                </Form.Group>
                            );
                        })
                    }                  
                    
                    {/* Save button */}
                    <div className = "button"> Save </div>
                    
                </Form>
            </div>
        )
    }
}
