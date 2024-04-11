import React from 'react'
import {SHA256} from "crypto-js";
import {BACKEND_URL} from '../../constants';
import axios from 'axios';
import {Navigate} from "react-router-dom";
import "./LoginPage.css";


class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
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
        const hashed = SHA256(this.state.password + this.state.email).toString()
        axios.post(`${BACKEND_URL}/auth/login`, {email: this.state.email, password: hashed}).then((response) => {
            localStorage.setItem('token', response.data.token);
            this.setState({success: true})
        }).catch((error) => {
            alert(error.response.data.message);
        })
        event.preventDefault();
    }

    render() {
        return <>
            {this.state.success ? (
                <Navigate to="/" />
            ) : (<form onSubmit={this.handleSubmit}>
                    <div className='LoginBox'>
                        <h2>LOGIN</h2>
                        <div className='InputBox'>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className='InputBox'>
                            <input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                        <div className='InputBox'>
                            <label htmlFor="pwd">Password</label>
                        </div>
                        <div className='InputBox'>
                            <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <div className='InputBox'>
                            <button type="submit" className="btn btn-primary m-4">Sign in</button>
                        </div>
                    </div>
                </form>
            )}
        </>
    }

}

export default LoginPage;
