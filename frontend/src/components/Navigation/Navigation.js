import React, {useState} from 'react';
import axios from 'axios';
import {BACKEND_URL} from '../../constants';
import {Link} from 'react-router-dom';
import './Navigation.css';

class Navigation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            username: "",
            token: "",
            loggedIn: false
        }
        this.updateLoginInfo = this.updateLoginInfo.bind(this)
        this.signOut = this.signOut.bind(this)
    }


    componentDidMount() {
        window.addEventListener("storage", (e) => {
            console.log(localStorage.getItem("token"))
            this.setState({token: localStorage.getItem('token')});
            this.updateLoginInfo()
        });
        this.updateLoginInfo()
    }

    componentDidUpdate(prevProps, prevState) {
        // TODO do not make this spam the request
        this.updateLoginInfo()
    }

    updateLoginInfo() {
        axios.get(`${BACKEND_URL}/auth/info`, {
            headers: {
                'Authorization': this.state.token
            }
        }).then((response) => {
            if (response.data.id) {
                this.setState({
                    username: response.data.username,
                    id: response.data.id,
                    loggedIn: true
                })
            } else {
                this.setState({loggedIn: false})
            }

        }).catch((error) => {
            this.setState({loggedIn: false})
        })
    }

    signOut() {
        localStorage.removeItem("token");
        this.updateLoginInfo()
    }


    render() {
        return <div className="navbar">
            {
                localStorage.hasOwnProperty("token") ? (
                    <>
                        <Link to="/profile" className='login'>Profile</Link>
                        <Link to="/upload" className='register'>Upload</Link>
                        <button onClick={this.signOut} className='signout'>Sign Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className='login'>Login</Link>
                        <Link to="/register" className='register'>Register</Link>
                    </>
                )
            }
        </div>
    }

}

export default Navigation;
