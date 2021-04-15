import Cookies from 'js-cookie';
import React, { Component } from 'react';

class chessboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            ready: [],
            player: "x"
        }
    }

    componentDidMount() {
        this.createTable()
        this.props.socket.on("request-set-value-chess", data => {
            this.setState({ data: data });
        })
        this.props.socket.on("set-value-chess", data => {
            if (data === false) {
                if (this.state.ready.length > 1) {
                    alert("Bạn thắng ...")
                }
                this.createTable();
                this.setState({
                    ready: [],
                    type: "x"
                });

            }
        })
        this.props.socket.on("send-user-win", async data => {
            alert(data.message)
            this.setState({
                ready: []
            });
            setTimeout(() => {
                this.createTable();
            }, 1000)

        })
        this.props.socket.on("request-ready", data => {
            const ready = this.state.ready;
            if (ready.indexOf(data) < 0) {
                ready.push(data)
                this.setState({
                    ready: ready,
                    player: "x"
                });
            }
        })
        this.props.socket.on("request-set-player", data => {
            this.setState({
                player: data
            });
        })
    }
    createTable = async () => {
        let newData = [];
        for (let row = 0; row < 15; row++) {
            let newRow = [];
            for (let col = 0; col < 17; col++) {
                newRow.push({
                    row: row,
                    col: col,
                    value: ""
                })

            }
            newData.push(newRow)
        }
        this.setState({
            data: newData
        })
    }
    setValue = (rowIndex, colIndex, value) => {
        let user = JSON.parse(Cookies.get("user"));
        const player = this.props.rooms[this.props.currentRoom].player;
        player.map(element => {
            if (element.name === user.username) {
                if (this.state.ready.length > 1 && this.state.player === element.type) {
                    this.props.socket.emit("set-value-chess", {
                        row: rowIndex,
                        col: colIndex,
                        roomIndex: this.props.currentRoom,
                        currentType: element.type
                    })
                }
            }
            return null;
        })

    }
    cell = (rowData, rowIndex) => {
        const value = (cell) => {
            if (cell.value === "x") {
                return (
                    <div className="value x">{cell.value}</div>
                )
            } else {
                return (
                    <div className="value o">{cell.value}</div>
                )
            }

        }
        return rowData.map((cell, colIndex) => {
            return (
                <div onClick={() => { this.setValue(rowIndex, colIndex) }} className="cols">
                    {value(cell)}
                </div>
            )
        })
    }
    rowData = () => {
        return this.state.data.map((rowData, rowIndex) => {
            return (
                <div className="rows">
                    { this.cell(rowData, rowIndex)}
                </div>
            )
        })

    }
    ready = () => {
        let user = JSON.parse(Cookies.get("user"));
        const values = {
            roomIndex: this.props.currentRoom,
            name: user.username,
        }
        this.props.socket.emit("ready", values)
    }
    render() {
        let user = JSON.parse(Cookies.get("user"));
        let info = this.props.rooms[this.props.currentRoom].player;
        let name_caro = (name) => {
            let trim = name.trim().split((/[\s,]+/));
            if (trim.length > 1) {
                const username = trim[trim.length - 2] + " " + trim[trim.length - 1]
                return (
                    username
                )
            } else {
                const username = trim[trim.length - 1];
                return (username)
            }
        }
        let ready = () => {
            const ready = this.state.ready;
            if (ready.length < 1) {
                return (
                    <div onClick={() => { this.ready() }} className="ready"> Sẵn Sàng</div>
                )
            } else {
                if (ready.length === 1) {
                    if (ready.indexOf(user.username) >= 0) {
                        return (
                            <div onClick={() => { this.unReady() }} className="ready"><i className="fas fa-check-double"></i></div>
                        )
                    } else {
                        return (
                            <div className="left">
                                <span onClick={() => { this.ready() }} className="ready"> Sẵn Sàng</span>
                                <span className="ready-user2-success" ><i className="fas fa-check-double"></i></span>
                            </div>


                        )
                    }

                } else {
                    if (ready.indexOf(user.username) >= 0) {
                        return (
                            <div className="left">
                                <span onClick={() => { this.ready() }} className="ready"><i className="fas fa-check-double"></i></span>
                                <span className="ready-user2-success" ><i className="fas fa-check-double"></i></span>
                            </div>
                        )
                    }
                }
            }

        }
        let ready_user_2 = () => {
            const ready = this.state.ready;
            if (ready.length === 1) {
                if (ready.indexOf(user.username) < 0) {
                    return (
                        <div onClick={() => { this.unReady() }} className="ready-user-2"><i className="fas fa-check-double"></i></div>
                    )
                }
            }
        }
        let info_caro = () => {
            if (this.state.data.length > 0) {
                if (info.length === 1) {
                    if (info[0].name === user.username) {
                        return (
                            <div>
                                <div className="user">
                                    <div className=" user1 ">
                                        <span>
                                            <img src={info[0].info.image} alt="" />
                                        </span>
                                        <span className="name-user1">
                                            {name_caro(info[0].info.fullname)}
                                        </span>
                                        <div className="type">
                                            {info[0].type}
                                        </div>
                                    </div>
                                    <div className=" user2">
                                        <div className="invite">
                                            <i className="fas fa-plus-square"></i>
                                            Mời Bạn
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <div className="user">
                                    <div className=" user1 ">
                                        <img src={info[0].info.image} alt="" />

                                        <span className="name-user1">
                                            {name_caro(info[0].info.fullname)}
                                        </span>
                                        <div className="type">
                                            {this.props.type}
                                        </div>
                                    </div>
                                    <div className=" user2">
                                        Mời Bạn
                                    </div>
                                </div>
                            </div>
                        )
                    }
                } else {
                    if (info.length === 2) {
                        if (info[0].name === user.username) {
                            return (
                                <div className="user">
                                    <div className="user1">
                                        <img src={info[0].info.image} alt="" />
                                        {ready()}
                                        <span className="name-user1">
                                            {name_caro(info[0].info.fullname)}
                                        </span>
                                        <div className="type">

                                            {info[0].type}
                                        </div>
                                    </div>
                                    <div className="user2">
                                        {ready_user_2}
                                        <div className="type-user-2">
                                            {info[1].type}
                                        </div>

                                        <span className="name-user2">
                                            {name_caro(info[1].info.fullname)}
                                        </span>
                                        <span>
                                            <img src={info[1].info.image} alt="" />
                                        </span>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div>
                                    <div className="user">
                                        <div className=" user1 ">
                                            <img src={info[1].info.image} alt="" />
                                            {ready()}
                                            {/* <div onClick={() => { this.ready() }} className="ready"> Sẵn Sàng</div> */}
                                            <span className="name-user1">
                                                {name_caro(info[1].info.fullname)}
                                            </span>
                                            <div className="type">
                                                {info[1].type}
                                            </div>
                                        </div>
                                        <div className=" user2 ">
                                            {ready_user_2}
                                            <div className="type-user-2">
                                                {info[0].type}
                                            </div>
                                            <span className="name-user2">
                                                {name_caro(info[0].info.fullname)}
                                            </span>
                                            <span>
                                                <img src={info[0].info.image} alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )

                        }
                    }
                }

            }
        }
        const play = () => {
            if (this.state.ready.length === 2) {
                if (this.state.player === "x") {
                    return (
                        <div className="play"> X  đánh </div>
                    )

                } else {
                    return (
                        <div className="play"> O  đánh </div>
                    )
                }
            }

        }
        return (
            <div>
                <div className="fullScreen">
                    Quay ngang cái điện thoại lại
                    <br></br>
                    <i className="fas fa-mobile-alt"></i>
                </div>
                { play()}
                { info_caro()}

                { this.rowData()}

            </div >
        )
    }
}

export default chessboard;