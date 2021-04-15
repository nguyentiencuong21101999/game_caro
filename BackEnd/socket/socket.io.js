const userModel = require('../modules/user.model')
const Accept = require('../models/accept/accept')
var rooms = [];
let userOnline = [];
var system = "messenger";
module.exports = (io) => {
    io.on("connection", async (socket) => {
        socket.on("rooms-addfriend", (roomsAddFriend) => {
            socket.join(roomsAddFriend + "s");
            socket.join("messenger");
            //online 
            userOnline.push({ socketId: socket.id, name: roomsAddFriend });
            io.in(system).emit('request-update-online', userOnline);

        })
        socket.on("send-invatition", async data => {
            io.in(data.to).emit('request-invation', data.send + " gửi lời mời kết bạn ");
        })
        socket.on("upload-message", async data => {
            const results = await Accept.find({ userId: data.userId, friendId: data.friendId });
            const results1 = await Accept.find({ userId: data.friendId, friendId: data.userId });
            if (results.length < 1) {
                io.in(data.toMe).emit('request-upload-massage', { userId: data.friendId, message: "Gửi lời mời" });
                io.in(data.toYou).emit('request-upload-massage', { userId: data.userId, message: "Gửi lời mời" });
            } else {
                if (results[0].send.toString() === data.userId.toString() && results1[0].send.toString() === data.userId.toString()) {
                    io.in(data.toMe).emit('request-upload-massage', { userId: data.friendId, message: "Đã Gửi Lời Mời" });
                    io.in(data.toYou).emit('request-upload-massage', { userId: data.userId, message: "Chấp Nhận" });
                }
                if (results[0].send.toString() === data.friendId.toString() && results1[0].send.toString() === data.friendId.toString()) {
                    io.in(data.toMe).emit('request-upload-massage', { userId: data.friendId, message: "Đã Kết Bạn" });
                    io.in(data.toYou).emit('request-upload-massage', { userId: data.userId, message: "Đã Kết Bạn" });
                }
            }
        })
        socket.on("upload-friend", async data => {
            const friendUserId = await userModel.getFriend(data.userId);
            const friendFriendId = await userModel.getFriend(data.friendId);
            io.in(data.toMe).emit('request-upload-friend', friendUserId);
            io.in(data.toYou).emit('request-upload-friend', friendFriendId);
        })
        // Chat
        socket.on("join-rooms", data => {

            const roomName = data.friend + data.user;
            const createRoomName = data.user + data.friend;
            if (rooms.indexOf(roomName) < 0) {
                socket.join(createRoomName)
                rooms.push(createRoomName)
                io.in(createRoomName).emit("request-join-rooms", createRoomName)
            } else {
                rooms[rooms.indexOf(roomName)]
                socket.join(roomName)
                io.in(roomName).emit("request-join-rooms", createRoomName)
            }
        })

        socket.on("send-messenger", async data => {
            const rooms_1 = data[0].user + data[0].friend;
            const rooms_2 = data[0].friend + data[0].user;
            const results = await userModel.saveMessenger(data);
            io.in(rooms_1).in(rooms_2).emit('request-send-messenger', results);
        })
        socket.on("upload-value-messenger", async data => {
            const rooms_1 = data.user + data.friend;
            const rooms_2 = data.friend + data.user;
            const results = await userModel.uploadValueMessenger(data)
            io.in(rooms_1).in(rooms_2).emit('request-send-messenger', results);
        })

        socket.on("leave-rooms", data => {
            const roomName = data.friend + data.user;
            const createRoomName = data.user + data.friend;
            socket.leave(roomName);
            socket.leave(createRoomName);
        })
        //upload avatar
        socket.on("change-avatar", async data => {
            const results = await userModel.changeAvatar(data);
            io.in(data.username + "s").emit("request-change-avatar", results)
            socket.broadcast.emit("request-update-avatar", true);
        })

        socket.on("upload-list-accept", async data => {
            const results = await userModel.getListAcceptFriend(data.userId)
            io.in(data.username + "s").emit("request-upload-list-accept", results);
        })
        socket.on("off", data => {
            const pos = userOnline.map(function (e) { return e.socketId; }).indexOf(socket.id);
            userOnline.splice(pos, 1)
            io.in(system).emit('request-update-online', userOnline);
        })
        //co Caro
        socket.on("disconnect", () => {
            const pos = userOnline.map(function (e) { return e.socketId; }).indexOf(socket.id);
            userOnline.splice(pos, 1)
            io.in(system).emit('request-update-online', userOnline);
        })

    })

}