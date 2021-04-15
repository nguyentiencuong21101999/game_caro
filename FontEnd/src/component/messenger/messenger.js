// import React, { Component } from 'react';
// // import io from 'socket.io-client'
// // var socket =
// //     io("https://messengers-server.herokuapp.com/");
// //     io("http://localhost:4000/");

// class messenger extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             txt_messenger: "",
//             auth: false,
//             txt_name: "",
//             txt_password: "",
//             rooms: [],
//             currentRoom: -1,
//             value_messenger: [],
//             name: "",
//             user: ["chang", "cuong"]

//         }
//     }
//     showNotication = () => {
//         const notification = new Notification("new messenger", {
//             body: "New Messenger ?"
//         })
//     }
//     componentDidMount() {
//         //#region 
//         console.log(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString());
//         // navigator.serviceWorker.register('../../../public/index.html');
//         // if (Notification.permission === 'granted') {
//         //     // navigator.serviceWorker.ready.then(function (registration) {
//         //     //     registration.showNotification('Notification with ServiceWorker');
//         //     // });
//         //     this.showNotication()
//         // } else if (Notification.permission !== 'denied') {
//         //     Notification.requestPermission().then(permission => {
//         //         console.log(permission);
//         //         // if (Notification.permission === 'granted') {
//         //         //     this.showNotication()
//         //         // }
//         //         if (permission === 'granted') {
//         //             navigator.serviceWorker.ready.then(function (registration) {
//         //                 registration.showNotification('Notification with ServiceWorker');
//         //             });
//         //         }

//         //     })
//         // }
//         //#endregion


//         // socket.on('connect', () => {

//         //     const values = {
//         //         name: this.state.txt_name,
//         //         password: this.state.txt_password,
//         //         currentRoom: 0
//         //     }
//         //     socket.emit("create-rooms", values)

//         //     socket.on("upload-rooms", (results) => {
//         //         console.log(results);
//         //         this.setState({
//         //             rooms: results,
//         //             value_messenger: results[0].data

//         //         });
//         //         if (!this.state.auth) {
//         //             this.scrollToBottom()
//         //         }
//         //     })

//         //     socket.on("value-messenger", results => {
//         //         console.log(results);
//         //         this.setState({
//         //             value_messenger: results
//         //         });
//         //         if (!this.state.auth) {
//         //             this.scrollToBottom()
//         //         }
//         //     })
//         //     socket.on("leave-rooms-success", data => {
//         //         if (data) {
//         //             this.setState({
//         //                 auth: true,
//         //                 txt_name: "",
//         //                 txt_password: "",
//         //                 name: "",
//         //                 rooms: [],
//         //                 currentRoom: -1,
//         //                 txt_messenger: ""

//         //             });
//         //         }
//         //     })
//         //     socket.on("out-rooms", data => {
//         //         alert(data)
//         //     })
//         // }
//         // )

//     }
//     scrollToBottom() {
//         this.el.scrollIntoView({ behavior: 'smooth' });
//     }
//     sendMessenger = (event) => {
//         if (this.state.txt_messenger !== "") {

//             if (!this.state.auth) {
//                 this.scrollToBottom();
//             }
//             const value = document.getElementById("messenger").value;
//             const date = new Date().toLocaleDateString();
//             const time = new Date().toLocaleTimeString();
         
//             const value_messenger = this.state.value_messenger;
//             console.log(value_messenger);
//             const values = [{
                
//                 dateTime: date + " " + time,
//                 messenger: value,
//                 currentRoom: this.state.currentRoom,
//                 name: this.state.txt_name
//             },
//             {
//                 value_messenger:this.state.value_messenger
//             }
//         ]
//             // socket.emit("send-messenger", values)
//             this.setState({
//                 txt_messenger: ""
//             });
//         }
//     }
//     deleteMessenger = () => {
//         const values = {
//             currentRoom: 0
//         }
//         // socket.emit("remove-messenger", values)
//     }
//     signOut = () => {
//         const values = {
//             currentRoom: 0,
//             name: this.state.name
//         }
//         // socket.emit("leave-rooms", values)
//     }
//     getValue = (event) => {
//         const { name, value } = event.target;
//         this.setState({
//             [name]: value
//         });
//     }
//     authPassword = (currentRoom) => {
//         let dem = 0;
//         this.state.user.map(element => {
//             if (element === this.state.txt_name) {
//                 dem++;
//             }
//             return null;
//         })
//         if (dem === 0) {
//             alert("Nhập cho đúng cái tên coi...")
//         } else {
//             if (this.state.txt_password !== "changml") {
//                 alert("Sao ngu zữ vậy ! Cái pass kìa ...")
//             } else {
//                 const values = {
//                     name: this.state.txt_name,
//                     password: this.state.txt_password,
//                     currentRoom: currentRoom
//                 }
//                 // socket.emit("create-rooms", values)
//                 this.setState({
//                     name: this.state.txt_name,
//                     auth: false,
//                     currentRoom: currentRoom
//                 });
//             }
//         }




//     }
//     render() {
//         const rooms = () => {
//             if (this.state.txt_name !== "" && this.state.txt_password !== "") {

//                 return (
//                     <button
//                         onClick={() => { this.authPassword(0) }}
//                         type="button"
//                         class="btn btn-danger">
//                         Múc
//                     </button>
//                 )

//             }
//         }
//         const password = () => {
//             if (this.state.auth) {
//                 return (
//                     <div>
//                         <img style={{
//                             position: "absolute",
//                             marginTop: "10%",
//                             marginLeft: "33%",
//                             borderRadius: "25px",
//                             height: "120px",
//                             width: "120px"
//                         }} src="https://sieupet.com/sites/default/files/cho-pug-mat-xe-hinh-anh-cho-mat-xe-cho-mat-xe-de-thuong-1.jpg" alt="" />
//                         <div style={{ marginLeft: "25%", paddingTop: "50%" }} className="form-group">
//                             <label for="usr">Mày Là ai : </label>
//                             <input autoComplete="off" onChange={(event) => { this.getValue(event) }} style={{
//                                 width: "200px",
//                             }} type="text" className="form-control" name="txt_name" id="usr" />
//                         </div>
//                         <div style={{ marginLeft: "25%" }} className="form-group">
//                             <label for="usr">Xin Cái password :</label>
//                             <input autoComplete="off" onChange={(event) => { this.getValue(event) }} style={{
//                                 width: "200px",
//                             }} type="password" className="form-control" name='txt_password' id="usr" /> <br></br>
//                             {rooms()}

//                         </div>
//                     </div>
//                 )
//             }
//         }
//         const value_messenger = () => {
//             console.log(this.state.value_messenger);
//             if (this.state.value_messenger.length > 0) {
//                 console.log(this.state.value_messenger);
//                 return this.state.value_messenger.map(element => {
//                     if (element.name === this.state.name) {
//                         return (
//                             <div className="d-flex justify-content-end mb-2">
//                                 <div className="msg_cotainer_send">
//                                     {element.messenger}
//                                     <span className="msg_time_send">{element.dateTime}</span>
//                                 </div>
//                                 {/* <div className="img_cont_msg">
//                                     <img src="https://vcdn-ngoisao.vnecdn.net/2019/09/25/ANH-1-9778-1569408745.png" className="rounded-circle user_img_msg" />
//                                 </div> */}
//                             </div>
//                         )
//                     } else {
//                         return (
//                             <div className="d-flex justify-content-start mb-2">
//                                 <div className="img_cont_msg">
//                                     <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" alt="" />
//                                 </div>
//                                 <div className="msg_cotainer">
//                                     {element.messenger}
//                                     <span className="msg_time">{element.dateTime}</span>

//                                 </div>
//                             </div>

//                         )
//                     }


//                 })
//             }
//         }
//         const messenger = () => {
//             if (!this.state.auth) {
//                 return (
//                     <div className="container-fluid h-100">
//                         <div className="row justify-content-center h-100">
//                             <div className="col-md-8 col-xl-6 chat">
//                                 <div className="card">
//                                     <div className="card-header msg_head">
//                                         <div className="d-flex bd-highlight">
//                                             <div className="img_cont">
//                                                 <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" alt="" />
//                                                 <span className="online_icon" />
//                                             </div>
//                                             <div className="user_info">
//                                                 {/* {name_chat()} */}
//                                                 <span>{this.state.name}</span>
//                                                 <p>:))</p>
//                                             </div>
//                                             <div className="video_cam">
//                                                 <span><i className="fas fa-video" /></span>
//                                                 <span><i className="fas fa-phone" /></span>
//                                             </div>
//                                         </div>

//                                         <div className="btn-group dropleft">
//                                             <button type="button" className="btn btn-secondary " id="action_menu_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                                 <i className="fas fa-ellipsis-v drop" />
//                                             </button>
//                                             <div className="dropdown-menu action_menu" id="action_menu">
//                                                 <div className="ul">
//                                                     <div style={{ color: "red" }} onClick={() => { this.deleteMessenger() }} className="li"  >Xóa Tin   &ensp; <i class="fas fa-trash delete"></i> </div>
//                                                     <hr style={{ width: "80%", margin: "0px", marginLeft: "17px ", backgroundColor: "white" }}></hr>
//                                                     <div className="li" onClick={() => { this.signOut() }} >Đăng Xuất<i class="fas fa-sign-out-alt signout"></i> </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                         {/* <span id="action_menu_btn"><i className="fas fa-ellipsis-v drop" /></span>
//                                         <div className="action_menu" id="action_menu">
//                                             <ul>
//                                                 <li ><i class="fas fa-trash"></i> Xóa</li>
//                                                 <li><i class="fas fa-sign-out-alt"></i> Đăng Xuất</li>
//                                             </ul>
//                                         </div> */}
//                                     </div>
//                                     <div className="card-body msg_card_body">
//                                         {value_messenger()}
//                                         <br></br>
//                                         <div style={{
//                                             marginTop: "-60px", clear: "both", height: "1px",
//                                             color: "rgba(0,0,0,.03)"
//                                         }} id="scroll" ref={el => { this.el = el; }} >.</div>
//                                         {/* {this.scrollToBottom()} */}
//                                     </div>

//                                     <div className="card-footer">

//                                         <div className="input-group">
//                                             <div className="input-group-append">
//                                                 <span className="input-group-text attach_btn"><i className="fas fa-paperclip" /></span>
//                                             </div>
//                                             <textarea autoComplete="off" onChange={(event) => { this.getValue(event) }} style={{ width: "200px", height: "35px", wordWrap: "break-word" }} id="messenger" value={this.state.txt_messenger} name="txt_messenger" type="text" className="form-control" />
//                                             <div className="input-group-append">
//                                                 {/* <i className="fas fa-location-arrow" /> */}
//                                                 <div onClick={(event) => { this.sendMessenger(event) }} value=">" className="input-group-text send_btn"><i style={{ transform: "rotate(-90deg)" }} class="fab fa-vuejs"></i></div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div >
//                 )
//             }


//         }

//         return (

//             <div className="messenger">
//                 {/* {password()} */}
//                 {messenger()}
//             </div>
//         )
//     }
// }

// export default messenger;