import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            username: "",
            password: "",
            redirect: false
        }
    }
    submitRegister = () => {
        const values = {
            fullname: this.state.fullname,
            username: this.state.username,
            password: this.state.password
        }
        axios.post("/user/register", values)
            .then(
                results => {
                    if (results.data.status === "error") {
                        alert(results.data.message)
                    } else {
                        alert("Đăng Kí Tài Khoản Thành Công")
                        this.setState({
                            fullname: "",
                            username: "",
                            password: "",
                            redirect: true
                        });
                    }
                }
            )
    }
    render() {
        if(this.state.redirect){
            return <Redirect  to={"/"}></Redirect>
        }
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100" style={{ backgroundImage: 'url("images/bg-01.jpg")' }}>
                        <div className="wrap-login100 p-t-30 p-b-50">
                            <span className="login100-form-title p-b-41">
                                Đăng Ký
                        </span>
                            <div className="login100-form validate-form p-b-33 p-t-5">
                                <div className="wrap-input100 validate-input" data-validate="Enter username">
                                    <input onChange={(event) => { this.setState({ fullname: event.target.value }) }} className="input100" type="text" name="username" autoComplete="off" placeholder="Full name" />
                                    <span className="focus-input100" data-placeholder="" />
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Enter username">
                                    <input onChange={(event) => { this.setState({ username: event.target.value }) }} className="input100" type="text" name="username" autoComplete="off" placeholder="User name" />
                                    <span className="focus-input100" data-placeholder="" />
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input onChange={(event) => { this.setState({ password: event.target.value }) }} className="input100" type="password" name="pass" placeholder="Password" />
                                    <span className="focus-input100" data-placeholder="" />
                                </div>
                                <div className="container-login100-form-btn m-t-32">
                                    <button onClick={(event => { this.submitRegister(event) })} className="login100-form-btn">
                                        Đăng Ký
                                </button>
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
export default register;