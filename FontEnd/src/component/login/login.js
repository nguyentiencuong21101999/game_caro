import React, { Component } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'
import { NavLink, Redirect } from 'react-router-dom';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            user: {},
            redirect: false
        }
    }
    submitLogin = async() => {
        const values = {
            username: this.state.username,
            password: this.state.password
        }
        await axios.post("/user/login", values)
            .then(
                results => {
                    if (results.data.status === "error") {
                        alert(results.data.message)
                    } else {
                        alert("Đăng nhập thành công")
                        const values = {
                            id: results.data.id,
                            fullname: results.data.fullname,
                            username: results.data.username,
                            image: results.data.image
                        }
                        Cookies.set("user", values)
                         this.setState({
                            username: "",
                            password: "",
                            user: {},
                            redirect: true
                        })
                      
                    }
                }
            )

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={"/messenger"}></Redirect>
        }
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100" style={{ backgroundImage: 'url("images/bg-01.jpg")' }}>
                        <div className="wrap-login100 p-t-30 p-b-50">
                            <span className="login100-form-title p-b-41">
                               Đăng Nhập
                            </span>
                            <div className="login100-form validate-form p-b-33 p-t-5">
                                <div className="wrap-input100 validate-input" data-validate="Enter username">
                                    <input autoComplete="off" onChange={(event) => { this.setState({ username: event.target.value }) }} className="input100" type="text" name="username" placeholder="User name" />
                                    <span className="focus-input100" data-placeholder="" />
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input onChange={(event) => { this.setState({ password: event.target.value }) }} className="input100" type="password" name="pass" placeholder="Password" />
                                    <span className="focus-input100" data-placeholder="" />
                                </div>
                                <div className="container-login100-form-btn m-t-32">
                                    <button onClick={() => { this.submitLogin() }} className="login100-form-btn">
                                    Đăng Nhập
                                    </button>
                                </div>
                                <div>
                                    <NavLink to="/registers" className="btnRegister">Đăng Kí Tài Khoản</NavLink>
                                    <label className="btnForgot" >Quên Mật Khẩu </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="dropDownSelect1" />
            </div>


        );
    }
}

export default login;