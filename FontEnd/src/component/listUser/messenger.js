import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { showImageAvatar } from './showImage'
import { Image } from 'cloudinary-react';
import ProgressBar from 'react-bootstrap/ProgressBar'
class messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt_messenger: "",
            current_value_messenger: [],
            value_messenger: [],
            icon: false,
            fileImage: [],
            selectedFile: null,
            progress: 0
        }
    }
    componentDidMount() {
        const user = JSON.parse(Cookies.get("user"));
        const val = { user: user.username, friend: this.props.friend.username };

        axios.post("/user/upload-value-message", val)
            .then(results => {
                this.setState({
                    value_messenger: results.data
                });
                this.scrollToBottom()
            })

        this.props.socket.on("request-send-messenger", async data => {
            this.scrollToBottom()
            this.setState({
                value_messenger: data,
                progress: 100
            }, () => {
                setTimeout(() => {
                    this.setState({
                        progress: 0
                    });
                }, 2000)
            });

        })
        if (this.state.selectedFile) {
            this.scrollToBottom()
        }

    }
    scrollToBottom() {
        const value = document.getElementById("scroll")
        value.scrollIntoView();

    }
    leaveRooms = (element) => {
        const user = JSON.parse(Cookies.get("user"));
        this.props.showMessenger(element)
        const values = {
            user: user.username,
            friend: this.props.friend.username
        }
        this.props.socket.emit("leave-rooms", values)
    }
    sendMessenger = async () => {
        const user = JSON.parse(Cookies.get("user"));
        const value = document.getElementById("messenger").value;
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        if (this.state.selectedFile) {
            this.setState({
                txt_messenger: "",
                selectedFile: null
            });
            const displayImgs = document.getElementById("displayImg");
            displayImgs.style.display = "none"
            const fd = new FormData();
            fd.append('file', this.state.selectedFile)
            fd.append('folder', "messenger")
            fd.append("upload_preset", 'xku7xge7');
            const option = {
                onUploadProgress: (ProgressEvent) => {
                    const { loaded, total } = ProgressEvent;
                    let percent = Math.floor((loaded * 100) / total)
                    if (percent < 100) {
                        this.setState({
                            progress: percent
                        });
                    }


                }
            }
            await axios.post('https://api.cloudinary.com/v1_1/cuong/image/upload/', fd, option)
                .then(
                    (res) => {
                        //cloud tra ve`
                        const values = [{
                            dateTime: date + " " + time,
                            value_messenger: value,
                            icon: "",
                            image: res.data.secure_url,
                            user: user.username,
                            friend: this.props.friend.username
                        }]
                        this.props.socket.emit("send-messenger", values)
                        this.scrollToBottom()
                    }
                )

        } else {
            const values = [{
                dateTime: date + " " + time,
                value_messenger: value,
                icon: "",
                image: "",
                user: user.username,
                friend: this.props.friend.username
            }]
            this.props.socket.emit("send-messenger", values)
            this.setState({
                txt_messenger: "",
            });
            this.scrollToBottom()
        }


    }
    sendIcon = () => {
        const user = JSON.parse(Cookies.get("user"));
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        const values = [{
            dateTime: date + " " + time,
            value_messenger: "",
            icon: "fas fa-heart",
            image: "",
            user: user.username,
            friend: this.props.friend.username
        }
        ]
        this.props.socket.emit("send-messenger", values)
        this.setState({
            txt_messenger: ""
        });

    }
    setCurrentMessage = (element) => {
        this.setState({ current_value_messenger: element });
    }
    changSize = (event) => {
        if (this.state.txt_messenger === "") {
            this.setState({
                icon: true
            });
        } else {
            this.setState({
                icon: false
            });
        }
        this.setState({ txt_messenger: event.target.value });
        var tx = document.getElementsByTagName('textarea');
        for (var i = 0; i < tx.length; i++) {
            tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
            tx[i].addEventListener("input", OnInput, false);
        }

        function OnInput(event) {
            this.style.height = '10px';
            this.style.height = (this.scrollHeight) + 'px';
        }
    }

    getFile = (event) => {

        if (event.target.files[0]) {
            const display = document.getElementById("displayImg");
            display.style.display = "block"
            this.setState({
                selectedFile: event.target.files[0]
            });
            showImageAvatar(event, "img", "displayImg")
        }
    }
    btnCancle = () => {
        const displayImgs = document.getElementById("displayImg");
        displayImgs.style.display = "none"
        this.setState({
            selectedFile: null
        });
    }

    render() {
        const progress = () => {
            if (this.state.progress > 0) {
                return (
                    <ProgressBar striped variant="success" now={this.state.progress} />
                )
            }

        }
        const value_messenger = () => {
            const user = JSON.parse(Cookies.get("user"));
            if (this.state.value_messenger.length > 0) {
                const sender = user.username + this.props.friend.username;
                return this.state.value_messenger.map(element => {
                    if (element.sender === sender) {
                        return element.messenger.map(results => {
                            if (user.username === results.sender) {
                                if (results.icon === "") {
                                    if (results.image !== "" && results.value_messenger !== "") {
                                        return (
                                            <div>
                                                <div className="image-messenger">
                                                    <Image cloudName="cuong" publicId={results.image} />
                                                </div>
                                                <div className="d-flex justify-content-end mb-2">
                                                    <div className="msg_cotainer_send">
                                                        {results.value_messenger}
                                                        <span className="msg_time_send">{results.dateTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        if (results.image !== "" && results.value_messenger === "") {
                                            return (
                                                <div className="image-messenger">
                                                    <Image cloudName="cuong" publicId={results.image} />
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div>
                                                    {/* <div className="image-messenger">
                                                        <Image cloudName="cuong" publicId={results.image} />
                                                    </div> */}
                                                    <div className="d-flex justify-content-end mb-2">
                                                        <div className="msg_cotainer_send">
                                                            {results.value_messenger}
                                                            <span className="msg_time_send">{results.dateTime}</span>

                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        }
                                    }
                                } else {
                                    return (
                                        <div className="d-flex justify-content-end mb-2">
                                            <div className="msg_cotainer_send_1">
                                                <i className="fas fa-heart icons-send" ></i>
                                                <span className="msg_time_send">{results.dateTime}</span>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            else {
                                if (results.icon === "") {

                                    if (results.image !== "" && results.value_messenger !== "") {
                                        return (
                                            <div>
                                                <div className="image-messenger1">
                                                    <Image cloudName="cuong" publicId={results.image} />
                                                </div>
                                                <div className="d-flex justify-content-start mb-2">
                                                    <div className="img_cont_msg">
                                                        <img src={this.props.friend.image} className="rounded-circle user_img_msg" alt="" />
                                                    </div>
                                                    <div className="msg_cotainer">
                                                        {results.value_messenger}
                                                        <span className="msg_time">{results.dateTime}</span>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        if (results.image !== "" && results.value_messenger === "") {
                                            return (
                                                <div className="image-messenger1">
                                                    <Image cloudName="cuong" publicId={results.image} />
                                                </div>
                                            )


                                        }
                                        else {
                                            return (
                                                <div className="d-flex justify-content-start mb-2">
                                                     <div className="img_cont_msg">
                                                            <img src={this.props.friend.image} className="rounded-circle user_img_msg" alt="" />
                                                        </div>
                                                    <div className="msg_cotainer">
                                                        {results.value_messenger}
                                                        <span className="msg_time">{results.dateTime}</span>

                                                    </div>
                                                </div>
                                            )

                                        }

                                    }

                                } else {
                                    return (
                                        <div className="d-flex justify-content-start mb-2">
                                            <div className="img_cont_msg">
                                                <img src={this.props.friend.image} className="rounded-circle user_img_msg" alt="" />
                                            </div>
                                            <div className="msg_cotainer_1">
                                                <i className="fas fa-heart icons"></i>
                                                <span className="msg_time">{results.dateTime}</span>

                                            </div>
                                        </div>

                                    )
                                }
                            }
                        })
                    }
                    return null;
                })
            }
        }
        const icon = () => {
            if (this.state.txt_messenger !== "" || this.state.selectedFile) {
                return (
                    <div id="hidden" className="input-group-append1">
                        <div onClick={(event) => { this.sendMessenger(event) }} value=">" className=" send_btn a"><i style={{
                            // transform: "rotate(-90deg)",
                            position: "absolute",
                            marginLeft: "-8px",
                            fontSize: "30px",
                            marginTop: "15px",

                        }} className="fab fa-vuejs"></i></div>
                    </div>

                )
            } else {
                return (
                    <div id="hidden-icon" className="input-group-append1">
                        <div onClick={(event) => { this.sendIcon(event) }} value=">" className=" send_btn a"><i style={{
                            transform: "rotate(90deg)",
                            position: "absolute",
                            marginLeft: "-12px",
                            fontSize: "30px",
                            marginTop: "13px"
                        }} className="fas fa-heart"></i></div>
                    </div>
                )
            }
        }
        const icon_online = () => {
            let pos = this.props.userOnline.map(function (e) { return e.name; }).indexOf(this.props.friend.username);
            if (pos >= 0) {
                return (
                    <span className="online_icon1" />
                )
            }

        }
        const btnCancle = () => {
            if (this.state.selectedFile) {
                this.scrollToBottom()
                return (
                    <i onClick={() => { this.btnCancle() }} className="fas fa-times-circle cancle_messenger"></i>
                )
            }
        }
        return (
            <div className="messenger" >
                <div className="container-fluid h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-md-8 col-xl-6 chat">
                            <div className="card">
                                <div className="card-header msg_head">
                                    <div className="d-flex bd-highlight">
                                        <i onClick={() => { this.leaveRooms(false) }} className="fas fa-chevron-left back"></i>
                                        <div className="img_cont">
                                            <img src={this.props.friend.image} className="rounded-circle user_img1" alt="" />
                                            {icon_online()}
                                        </div>
                                        <div className="user_info">
                                            {this.props.friend.fullname}
                                            <span>{this.state.name}</span>
                                            <p>:))</p>
                                        </div>
                                        <div className="video_cam">
                                            <span><i className="fas fa-video" /></span>
                                            <span><i className="fas fa-phone" /></span>
                                            <div
                                                //style={{ margin- left: 74%; margin-top: -50%;}} 
                                                className="btn-group dropleft">
                                                <button type="button" className="btn btn-secondary " id="action_menu_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-v drop" />
                                                </button>
                                                <div className="dropdown-menu action_menu" id="action_menu">
                                                    <div className="ul">
                                                        <div style={{ color: "red" }}
                                                            //onClick={() => { this.deleteMessenger() }} 
                                                            className="li"  >Xóa Tin   &ensp; <i className="fas fa-trash delete"></i> </div>
                                                        <hr style={{ width: "80%", margin: "0px", marginLeft: "17px ", backgroundColor: "white" }}></hr>
                                                        <div className="li"
                                                            onClick={() => { this.signOut() }}
                                                        >Đăng Xuất<i className="fas fa-sign-out-alt signout"></i> </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body msg_card_body">
                                    {value_messenger()}


                                    <br></br>
                                    <div style={{
                                        clear: "both", height: "1px",
                                        color: "rgba(0,0,0,.03)"
                                    }} id="scroll" ref={el => { this.el = el; }} >12312312</div>
                                    {/* {this.scrollToBottom()} */}
                                </div>


                                {progress()}
                                <div className="card-footer">
                                    {btnCancle()}
                                    <div className="displayImg" id="displayImg">
                                        {/* <i onClick={() => { this.btnCancle() }} className="fas fa-times-circle cancle"></i> */}
                                    </div>
                                    <input id='img' className="inputFile" type='file'
                                        onChange={(event) => { this.getFile(event) }}
                                        name="fileImage"
                                        multiple
                                    ></input>
                                    <label for="img" className="input-group-text-1 attach_btn">
                                        <i className="fas fa-paperclip" />
                                    </label>
                                    <di id="group" className=" input-group">
                                        &ensp; &ensp;&ensp;<textarea autoComplete="off"
                                            onChange={(event) => { this.changSize(event) }}
                                            style={{ resize: "none", width: "200px", height: "35px", overflow: "hidden", marginLeft: "27px" }}
                                            id="messenger"
                                            value={this.state.txt_messenger}
                                            name="txt_messenger" type="text"
                                            className="form-control form1"
                                        />
                                    </di>
                                </div>

                                {icon()}
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default messenger;