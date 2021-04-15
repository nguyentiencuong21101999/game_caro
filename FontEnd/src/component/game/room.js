import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import io from 'socket.io-client'
import Chessboard from './chessboard'
var socket =
      io("https://caros-server.herokuapp.com/");
   // io("http://localhost:1234/");
class room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            currentRoom: -1,
            type: "",
            chessboard: false,
        }
    }

    componentDidMount() {
        let user = JSON.parse(Cookies.get("user"));
        socket.emit("create-rooms", user.username)
        socket.on("request-data-rooms", data => {
            this.setState({
                rooms: data
            });
        })
        socket.on("request-join-rooms", data => {
            if (data.result) {
                this.setState({
                    rooms: data.rooms,
                    chessboard: true,
                    currentRoom: data.currentRoom,
                    type: data.type
                });
            } else {
                alert("Phòng đầy ....")
            }
        })
        socket.on("update-rooms", data => {
            this.setState({
                rooms: data 
            });
        })
       
    }
    joinRooms = (roomIndex) => {
        let user = JSON.parse(Cookies.get("user"));
        socket.emit('join-rooms', {
            roomIndex: roomIndex,
            name: user.username,
            info: user
        });

    }
    leaveRooms = () => {
        let user = JSON.parse(Cookies.get("user"));
        this.setState({
            chessboard: false,
            rooms: [],
            currentRoom: -1,
            type: ""
        });
        const values = {
            roomIndex: this.state.currentRoom,
            name:user.username,
            currentRoom:this.state.currentRoom
        }
        socket.emit("leave-rooms", values)
    }

    render() {
        if (!Cookies.get("user")) {
            return <Redirect exact to="/" />
        }
        let numberPlayer = (roomIndex) => {
            const rooms = this.state.rooms;
            if (rooms[roomIndex].player.length === 1) {
                return (
                    <span className="number-player"><i className="fas fa-user"></i></span>
                )
            } else {
                if (rooms[roomIndex].player.length === 2) {
                    return (
                        <div>
                            <span className="number-player"><i className="fas fa-user"></i></span>
                            <span className="number-player-2"><i className="fas fa-user"></i></span>
                        </div>
                    )

                }
            }
        }
        let rooms = () => {
            const rooms = this.state.rooms;
            if (rooms.length > 0) {
                return rooms.map(element => {
                    return (
                        <div onClick={() => { this.joinRooms(element.roomName) }} className="rooms">
                            {numberPlayer(element.roomName)}
                            <span className="room-name">
                                {element.roomName}
                            </span>
                            <div className='img-chess'>
                                <img src="../../../style/game/image/Removal-926.png" alt=""></img>
                            </div>

                        </div>
                    )

                })
            }
        }
        let chessboard = () => {
            if (this.state.chessboard) {
                return (
                    <div>
                        <div onClick={() => { this.leaveRooms() }} className="backs">
                            <i className="fas fa-chevron-left"></i>
                        </div>
                        <div id="wrapper" className='wrapper'>
                            <Chessboard
                                socket={socket}
                                rooms ={this.state.rooms}
                                type={this.state.type}
                                currentRoom ={this.state.currentRoom}
                            />
                        </div>
                    </div>

                )
            }
        }
        let all = () => {
            if (!this.state.chessboard) {
                return (
                    <div className="messenger" >
                        <div className="container-fluid h-100">
                            <div className="row justify-content-center h-100">
                                <div className="col-md-8 col-xl-8 chat">
                                    <div className="card">
                                        <div className="game_image">
                                            <img src="../../../style/game/image/lo-go-co-caro.png" alt=""></img>
                                        </div>
                                        <div className="chess">
                                            <div className="border-chess"></div>
                                            {rooms()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                )
            }
        }
        return (
            <div>
                {chessboard()}
                {all()}
            </div>
        );
    }
}

export default room;