import React from 'react'
import {SHA256} from "crypto-js";
import {BACKEND_URL} from '../../constants';
import {Navigate} from "react-router-dom";
import axios from 'axios';
import './RegisterPage.css';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            name: "",
            password: "",
            password_confirm: "",
            success: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        this.setState(
            {
                [name]: type === "checkbox" ? checked : value
            }
        )
    }

    handleSubmit(event) {
        if (this.state.password !== this.state.confirm_password) {
            alert("Please ensure passwords match!")
        }

        const hashed = SHA256(this.state.password + this.state.email).toString()
        axios.post(`${BACKEND_URL}/auth/register`, {username: this.state.username, email: this.state.email, password: hashed}).then((response) => {
            axios.post(`${BACKEND_URL}/auth/login`, {email: this.state.email, password: hashed}).then((response) => {
                localStorage.setItem('token', response.data.token);
                this.setState({success: true})
            }).catch((error) => {
                alert(error.response.data.message);
            })
        }).catch((error) => {
            alert(error.response.data.message);
        })
        event.preventDefault();
    }

    render() {
        return <>
            {
                this.state.success ? (
                    <Navigate to="/" />
                ) : (<form onSubmit={this.handleSubmit}>
                    <div className='RegisterBox'>
                        <h2>REGISTER</h2>
                        <div>
                            <div className='InputBox'>
                                <label htmlFor="email">Username</label>
                            </div>
                            <div className='InputBox'>
                                <input type="text" name="username" placeholder="Enter Username" value={this.state.username} onChange={this.handleChange} />
                            </div>
                            <br />
                            <div className='InputBox'>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className='InputBox'>
                                <input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div>
                            <div className='InputBox'>
                                <label htmlFor="pwd">Password</label>
                            </div>
                            <div className='InputBox'>
                                <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <br />
                            <div className='InputBox'>
                                <label htmlFor="pwd">Confirm Password</label>
                            </div>
                            <div className='InputBox'>
                                <input type="password" name="confirm_password" placeholder="Confirm password" value={this.state.confirm_password} onChange={this.handleChange} />
                            </div>
                            <br />
                        </div>
                        <div className='InputBox'>
                            <button type="submit" className="btn btn-primary m-4">Register</button>
                        </div>
                    </div>
                </form>
                )}
        </>

    }

}

export default RegisterPage;
