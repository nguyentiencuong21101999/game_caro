import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
class modal extends Component {
    componentDidMount() {
    }
    addFriend = async (element, massage, event) => {
        const user = JSON.parse(Cookies.get("user"))
        if (massage === "Gửi lời mời") {
            const values = {
                to: element.username + "s",
                send: user.fullname
            }
            this.props.socket.emit("send-invatition", values)

            const values_user = {
                userId: user.id,
                friendId: element.id,
                send: user.id
            }
            const values_friend = {
                userId: element.id,
                friendId: user.id,
                send: user.id
            }
            const value_upload =
            {
                userId: user.id,
                friendId: element.id,
                toMe: user.username + "s",
                toYou: element.username + "s"
            }
            await axios.post("/user/addFriend", [values_user, values_friend]).then(results => {
                if (results.data.status === "success") {
                    this.props.socket.emit("upload-message", value_upload)
                    this.props.socket.emit("upload-list-accept",{userId:element.id,username:element.username})
                }
            }
            )
        }
        if (massage === "Chấp Nhận") {
            const value_upload =
            {
                userId: user.id,
                friendId: element.id,
                toMe: user.username + "s",
                toYou: element.username + "s"
            }
            this.props.socket.emit("upload-message", value_upload)
            const values = {
                userId: user.id,
                friendId: element.id
            }
            await axios.post("/user/acceptFriend", values)
                .then(
                    () => {
                        this.props.socket.emit("upload-friend", value_upload)
                        
                    }
                )
        }
    }
    cancleFriend = async (element) => {
        const user = JSON.parse(Cookies.get("user"));
        const values = {
            userId: user.id,
            friendId: element.id
        }
        const value_upload =
        {
            userId: user.id,
            friendId: element.id,
            toMe: user.username + "s",
            toYou: element.username + "s"
        }
        await axios.post("/user/cancleFriend", values)
            .then(
                () => {
                    this.props.socket.emit("upload-list-accept",{userId:element.id,username:element.username})
                    this.props.socket.emit("upload-message", value_upload)
                }
            )
    }
    render() {
        const infoUser = () => {
            if (this.props.listSearch.status === "error") {
                return (
                    <div className="modal-body">
                        <p>{this.props.listSearch.message}</p>
                    </div>
                )
            } else {
                const user = JSON.parse(Cookies.get("user"));
                return this.props.listSearch.map(element => {
                    return this.props.checkAddFriend.map(results => {
                        if (element.id === results.friendId) {
                            if (user.fullname !== element.fullname) {
                                if (results.message === "Chấp Nhận") {
                                    return (
                                        <div className="modal-body">
                                            <img alt="" src={element.image} style={{ width: "40px", height: "40px", borderRadius: "25px" }}></img>
                                            <div className="info">
                                                <lable className="name">{element.fullname}</lable>
                                                <div className="role">Bạn bè</div>
                                            </div>
                                            <button onClick={() => { this.addFriend(element, results.message) }} className="add-friend">{results.message} </button>
                                            <button onClick={() => { this.cancleFriend(element) }} id="btnCancle" value="Hủy" className="add-friend1">Hủy</button>
                                        </div>
                                    )
                                }
                                if (results.message === "Đã Gửi Lời Mời") {
                                    return (
                                        <div className="modal-body">
                                            <img alt="" src={element.image} style={{ width: "40px", height: "40px", borderRadius: "25px" }}></img>
                                            <div className="info">
                                                <lable className="name">{element.fullname}</lable>
                                                <div className="role">Bạn bè</div>
                                            </div>
                                            <button className="add-friend3">{results.message} </button>
                                            <button onClick={() => { this.cancleFriend(element) }} className="add-friend1">Hủy </button>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="modal-body">
                                            <img alt="" src={element.image} style={{ width: "40px", height: "40px", borderRadius: "25px" }}></img>
                                            <div className="info">
                                                <lable className="name">{element.fullname}</lable>
                                                <div className="role">Bạn bè</div>
                                            </div>
                                            <button onClick={() => { this.addFriend(element, results.message) }} className="add-friend">{results.message} </button>
                                        </div>
                                    )
                                }
                            }
                        }
                        return null;
                    })
                })
            }
        }
        return (
            <div>
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Mọi Người</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            {infoUser()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default modal;