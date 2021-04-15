import React, { Component } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'
import { Redirect } from 'react-router';
import { Link, } from 'react-router-dom'
import Modal from './modal'
import Friend from './friend.js'
import User from './user'
import io from 'socket.io-client'
import Messenger from './messenger'
import ListAcceptFriend from './listAcceptFriend'
var socket =
    io(
        "https://messengers-server.herokuapp.com"
    );
// io("http://localhost:4000/");
class listUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: "",
            listUser: [],
            listSearch: [],
            listFriend: [],
            checkAddFriend: [],
            listAcceptFriend: [],
            user: {},
            firend: {},
            value_messenger: [],
            show_messenger: false,
            massage_errors: "",
            currentRooms: "",
            onScroll: false,
            userOnline: [],
            progress: 0

        }
    }
    componentDidMount() {
        if (Cookies.get("user")) {
            var user = JSON.parse(Cookies.get("user"));
            this.setState({
                user: user
            });


            axios.post("/user/getFriend", { userId: user.id }).then(
                results => {
                    this.setState({
                        listFriend: results.data
                    });
                }
            )
            const rooms = JSON.parse(Cookies.get("user"));
            socket.emit("rooms-addfriend", rooms.username);
            socket.on("request-rooms-addfriend", data => {
                this.setState({
                    userOnline: data
                });
            })
            socket.on("request-invation", results => {
                alert(results);
            })
            socket.on("request-upload-massage", async data => {
                const pos = this.state.checkAddFriend.map(function (e) { return e.friendId; }).indexOf(data.userId);
                if (pos >= 0) {
                    this.state.checkAddFriend.splice(pos, 1)
                    this.state.checkAddFriend.push({ friendId: data.userId, message: data.message })
                    this.setState({
                        checkAddFriend: this.state.checkAddFriend,
                    });
                }
            })

            socket.on("request-update-avatar", data => {
                axios.post("/user/getFriend", { userId: user.id }).then(
                    results => {
                        this.setState({
                            listFriend: results.data
                        });
                    }
                )
            })
            socket.on("request-upload-friend", data => {
                this.setState({ listFriend: data });
            })
            socket.on("request-update-online", data => {
                this.setState({
                    userOnline: data
                });
            })
        }
    }
    postTxtSearch = async (event) => {
        var user = JSON.parse(Cookies.get("user"));

        const values = {
            userId: JSON.parse(Cookies.get("user")).id,
            txtSearch: this.state.txtSearch
        }
        await axios.post("/user/getUserByFullname", values)
            .then(
                async results => {
                    this.setState({
                        listSearch: results.data
                    })
                    if (!results.data.status) {
                        results.data.map((element) => {
                            const value = {
                                userId: user.id,
                                friendId: element.id
                            }
                            axios.post("/user/checkAddFriend", value).then(
                                results => {
                                    let checkAddFriend = [];
                                    const values = {
                                        friendId: JSON.parse(results.config.data).friendId,
                                        message: results.data.message
                                    }
                                    checkAddFriend.push(values);
                                    if (this.state.checkAddFriend.length < 1) {
                                        this.setState({
                                            checkAddFriend: checkAddFriend
                                        });
                                    } else {
                                        const pos = this.state.checkAddFriend.map(function (e) { return e.friendId; }).indexOf(checkAddFriend[0].friendId);
                                        if (pos < 0) {
                                            this.state.checkAddFriend.push(checkAddFriend[0])
                                            this.setState({
                                                checkAddFriend: this.state.checkAddFriend
                                            });
                                        } else {
                                            this.state.checkAddFriend.splice(pos, 1)
                                            this.state.checkAddFriend.push(checkAddFriend[0])
                                            this.setState({
                                                checkAddFriend: this.state.checkAddFriend
                                            });
                                        }


                                    }

                                }

                            );
                            return null;
                        }
                        )
                    }
                    return null;

                })
    }
    render() {

        const btnSearch = () => {
            if (this.state.txtSearch !== "") {
                return (
                    <button onClick={(event) => { this.setState(() => { this.postTxtSearch() }); }} type="button" className="input-group-text search_btn " data-toggle="modal" data-target="#exampleModal">
                        <i className="fas fa-search" />
                    </button>
                )
            }
        }
        const friend = () => {
            if (this.state.listFriend.length > 0) {
                return (
                    <Friend
                        socket={socket}
                        listFriend={this.state.listFriend}
                        showMessenger={(element, results) => {
                            this.setState({
                                show_messenger: element,
                                friend: results
                            })
                        }}
                        userOnline={this.state.userOnline}



                    />
                )
            }

        }
        const messenger = () => {
            if (this.state.show_messenger) {
                return <Messenger
                    value_messenger={this.state.value_messenger}
                    socket={socket}
                    showMessenger={(element,) => { this.setState({ show_messenger: element }); }}
                    friend={this.state.friend}
                    onScroll={this.state.onScroll}
                    userOnline={this.state.userOnline}
                />
            }
        }
        const listUser = () => {
            if (!this.state.show_messenger) {
                return (
                    <div className="container-fluid h-100">
                        <div className="row justify-content-center h-100">
                            <div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
                                <div className="card-header">
                                    <ListAcceptFriend
                                        socket={socket}
                                    />
                                    {/* Modal */}
                                    <Modal listSearch={this.state.listSearch}
                                        checkAddFriend={this.state.checkAddFriend}
                                        socket={socket}
                                        txtSearch={this.state.txtSearch}
                                    />
                                    {/* end Modal */}

                                    <div className="input-group">

                                        {/* USER */}
                                        <User
                                            info={this.state.info}
                                            user={this.state.user}
                                            socket={socket}
                                            onScroll={this.state.onScroll}
                                            progress={this.state.progress}
                                        />
                                        <input onChange={(event) => { this.setState({ txtSearch: event.target.value }); }} type="text" placeholder="Search..." name className="form-control search  " />
                                        <div className="input-group-prepend">
                                            {btnSearch()}
                                            {/* //<span className="input-group-text search_btn"></span> */}

                                        </div>

                                    </div>
                                    <div className="icon-messenger"><i className="fab fa-facebook-messenger icon"></i>
                                        <div className="btn-group dropleft">
                                            <button type="button" className="btn btn-secondary " id="action_menu_btn1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-ellipsis-v drop1" />
                                            </button>
                                            <div className="dropdown-menu action_menu1" id="action_menu">
                                                <div className="ul">
                                                    <div className="game">
                                                        <Link onClick={() => { socket.emit("off", true) }} to="/caro-online">
                                                            Game Caro
                                                        </Link>

                                                    </div>
                                                    <button type="button" className="btn btn-primary acceptFriend" data-toggle="modal" data-target="#exampleModalListFriend">
                                                        Danh Sách Kết Bạn
                                                    </button>
                                                    <hr style={{ width: "80%", margin: "0px", marginLeft: "17px ", backgroundColor: "white" }}></hr>
                                                    <div className="li"
                                                        onClick={() => {
                                                            Cookies.remove('user')
                                                            this.setState({
                                                                txtSearch: "",
                                                            });
                                                            socket.emit("off", true)
                                                        }}>
                                                        Đăng Xuất
                                                <i className="fas fa-sign-out-alt signout"></i>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {friend()}
                            </div>
                            </div></div></div>
                )
            }
        }
        if (!Cookies.get("user")) {
            return <Redirect to="/" />
        }
        const all = () => {
            if (!this.state.rooms) {
                return (

                    <div>
                        {messenger()}
                        {listUser()}
                    </div>
                )
            }
        }
        return (
            <div>
                {all()}
            </div>
        )

    }
}
export default listUser;