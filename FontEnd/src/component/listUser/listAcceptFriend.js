import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';

class listAcceptFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAcceptFriend: []
        }
    }

    componentDidMount() {
        this.props.socket.on("request-upload-list-accept", results => {
            this.setState({
                listAcceptFriend: results
            });
        })
        const user = JSON.parse(Cookies.get("user"));
        axios.post("/user/getAcceptFriend", { userId: user.id }).then(
            results => {
                this.setState({ listAcceptFriend: results.data });
            }
        )
    }
    cancleFriend = async (element) => {
        console.log(element._id);
        const user = JSON.parse(Cookies.get("user"));
        const values = {
            userId: user.id,
            friendId: element._id
        }
        const value_upload =
        {
            userId: user.id,
            friendId: element._id,
            toMe: user.username + "s",
            toYou: element.username + "s"
        }
        await axios.post("/user/cancleFriend", values)
            .then(
                () => {
                    this.props.socket.emit("upload-list-accept", { userId: user.id, username: user.username })
                    this.props.socket.emit("upload-message", value_upload)
                }
            )
    }
    addFriend = async (element) => {
        const user = JSON.parse(Cookies.get("user"));
        const value_upload =
        {
            userId: user.id,
            friendId: element._id,
            toMe: user.username + "s",
            toYou: element.username + "s"
        }
        this.props.socket.emit("upload-message", value_upload)
        const values = {
            userId: user.id,
            friendId: element._id
        }
        await axios.post("/user/acceptFriend", values)
            .then(
                () => {
                    this.props.socket.emit("upload-list-accept", { userId: user.id, username: user.username })
                    this.props.socket.emit("upload-friend", value_upload)
                }
            )
    }
    render() {
        const listAcceptFriend = () => {
            const { listAcceptFriend } = this.state;
            if (listAcceptFriend.length > 0) {
                return listAcceptFriend.map(element => {
                    return (
                        <div className="modal-body">
                            <img alt="" src={element.image} style={{ width: "40px", height: "40px", borderRadius: "25px" }}></img>
                            <div className="info">
                                <lable className="name">{element.fullname}</lable>
                                <div className="role">B???n b??</div>
                            </div>
                            <button onClick={() => { this.addFriend(element) }} className="add-friend">Ch???p Nh???n </button>
                            <button onClick={() => { this.cancleFriend(element) }} id="btnCancle" value="H???y" className="add-friend1">H???y</button>
                        </div>
                    )
                })

            } else {
                return (
                    <div>
                        Ch??a c?? l???i M???i
                    </div>
                )
            }
        }
        return (
            <div>
                {/* Modal */}
                <div className="modal fade" id="exampleModalListFriend" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Danh S??ch K???t B???n</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">??</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {listAcceptFriend()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default listAcceptFriend;