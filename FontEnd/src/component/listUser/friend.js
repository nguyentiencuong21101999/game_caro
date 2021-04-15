import Cookies from 'js-cookie';
import React, { Component } from 'react';

class friend extends Component {
    submitFriend = (element) => {
        const user = JSON.parse(Cookies.get("user"))
        this.props.showMessenger(true, element);
        this.props.socket.emit("join-rooms", { user: user.username, friend: element.username })
        // const values = {
        //     user: user.username,
        //     friend: element.username
        // }
        //this.props.socket.emit("upload-value-messenger", values)
    }
    render() {
        const status = (element) => {
            let pos = this.props.userOnline.map(function (e) { return e.name; }).indexOf(element.username);
            if (pos >= 0) {
                return (
                    <div>
                        <span className="online_icon" />
                        <p> online</p>
                    </div>
                )
            }

        }
        const listFriend = () => {
            if (this.props.listFriend.length > 0) {
                return this.props.listFriend.map(element => {
                    return (
                        <div>
                            <li>
                                <div onClick={() => {
                                    this.submitFriend(element)
                                }}
                                    className="d-flex bd-highlight">
                                    <div className="img_cont">
                                        <img alt="" src={element.image} className="rounded-circle user_img" />


                                        <div className="user_info1">
                                            <span>{element.fullname}</span>

                                            {status(element)}
                                        </div>
                                    </div>

                                </div>


                            </li>

                        </div>

                    )
                })
            }
        }
        return (
            <div className="card-body contacts_body">
                <ui className="contacts">
                    {listFriend()}

                </ui>
            </div>
        );
    }
}

export default friend;