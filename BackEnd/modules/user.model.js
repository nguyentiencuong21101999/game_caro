
const User = require('../models/user/user')
const Friend = require("../models/friend/friend")
const Accept = require("../models/accept/accept")
const Messenger = require("../models/messenger/messenger")
const { ErrorCodeHandler, handleError } = require('../helpers/error_handle/error_handle');
const users = {};
users.register = async (object) => {
   const user = new User(object)
   const results = await user.save();
   return results;
}
users.login = async (object) => {
   const results = await User.findOne(object)
   if (!results) {
      throw new ErrorCodeHandler("Tài khoản hoặc mật khẩu không đúng !")
   };
   const user = {
      id: results._id,
      image: results.image,
      username: results.username,
      fullname: results.fullname
   }
   return user;
}
users.listUser = async () => {
   const results = await User.find();
   if (!results) {
      throw new ErrorCodeHandler("Bạn Thật Cô Đơn !")
   }
   let temp = [];
   results.map(element => {
      const user = {
         id: element.id,
         image: element.image,
         username: element.username,
         fullname: element.fullname
      }

      temp.push(user);
   })

   return temp;
}

users.getUserByFullname = async (txtSearch, userId) => {

   const regex = new RegExp(fullTextSearchVi(txtSearch), 'i')
   const results = await User.find({ fullname: regex });

   if (results.length < 1) {
      throw new ErrorCodeHandler("Không Có Người Này !")
   }
   let temp = [];

   results.map(async element => {

      if (userId !== element.id) {
         const user = {
            id: element.id,
            image: element.image,
            username: element.username,
            fullname: element.fullname
         }
         temp.push(user);
      }

   })

   return temp;
}

users.addFriend = async (userId, friendId) => {

   const userIds = new Accept(userId);
   const friendIds = new Accept(friendId)
   const results = await Accept.find({ userId: userId.userId, friendId: userId.friendId });
   const results1 = await Accept.find({ userId: userId.friendId, friendId: userId.userId });

   if (results.length === 0 && results1.length === 0) {
      await userIds.save();
      await friendIds.save();
   }

}
users.cancleFriend = async (userId, friendId) => {
   await Accept.findOneAndDelete({ userId: userId, friendId: friendId }).then();
   await Accept.findOneAndDelete({ userId: friendId, friendId: userId }).then();
}
users.getAccept = async (userId) => {
   const results = await Accept.find({ userId: userId });
   if (results.length < 1) { }
   return results;
}
users.acceptFriend = async (userId, friendId) => {

   const results = await Accept.findOne({ userId: userId, friendId: friendId, send: userId })
   const results1 = await Accept.findOne({ userId: friendId, friendId: userId, send: friendId })
   if (results && !results1 || !results && results1) {
      await Accept.findOneAndUpdate({ userId: userId, friendId: friendId }, { send: userId }).then(
         async (results) => {
            const userIds = new Friend({
               userId: userId,
               friendId: friendId
            })
            const friendIds = new Friend({
               userId: friendId,
               friendId: userId
            })
            await userIds.save();
            await friendIds.save();
         }

      )
   }

}
users.getFriend = async (userId) => {

   const results = await Friend.find({ userId: userId })
      .populate(
         {
            path: "friendId",
            select: ["id", "fullname", "username", "image"]
         }
      )
      .exec()
   const temp = [];
   results.map(element => {
      temp.push(element.friendId)
   })
   return temp;
}
users.checkAddFriend = async (userId, friendId) => {
   const results = await Accept.find({ userId: userId, friendId: friendId });
   const results1 = await Accept.find({ userId: friendId, friendId: userId });

   if (results.length < 1) {
      throw new ErrorCodeHandler("Gửi lời mời")
   } else {

      if (results[0].send.toString() === userId.toString() && results1[0].send.toString() === userId.toString()) {
         throw new ErrorCodeHandler("Đã Gửi Lời Mời")
      }
      if (results[0].send.toString() === friendId.toString() && results1[0].send.toString() === friendId.toString()) {
         throw new ErrorCodeHandler("Chấp Nhận")
      }
      if (results[0].send.toString() === userId.toString() && results1[0].send.toString() === friendId.toString()) {
         throw new ErrorCodeHandler("Đã Kết Bạn")
      }
   }
}
users.saveMessenger = async (element) => {
   let messenger_sender = {
      sender: element[0].user + element[0].friend,
      receiver: element[0].friend + element[0].user,
      messenger: [{
         dateTime: element[0].dateTime,
         value_messenger: element[0].value_messenger,
         icon: element[0].icon,
         image: element[0].image,
         sender: element[0].user,
         receiver: element[0].friend
      }]
   }
   let messenger_receiver = {
      sender: element[0].friend + element[0].user,
      receiver: element[0].user + element[0].friend,
      messenger: [{
         dateTime: element[0].dateTime,
         value_messenger: element[0].value_messenger,
         icon: element[0].icon,
         image: element[0].image,
         sender: element[0].user,
         receiver: element[0].friend
      }]
   }

   const messenger_senders = new Messenger(messenger_sender);
   const messenger_receivers = new Messenger(messenger_receiver)

   const resutls_sender = await Messenger.findOne({ sender: element[0].user + element[0].friend, receiver: element[0].friend + element[0].user });
   const resutls_receiver = await Messenger.findOne({ sender: element[0].friend + element[0].user, receiver: element[0].user + element[0].friend });
   if (!resutls_sender) {
      await messenger_senders.save();
   } else {
      await Messenger.findOneAndUpdate({ sender: element[0].user + element[0].friend, receiver: element[0].friend + element[0].user }, { $addToSet: { messenger: messenger_sender.messenger } })
   }
   if (!resutls_receiver) {
      await messenger_receivers.save();
   } else {
      await Messenger.findOneAndUpdate({ sender: element[0].friend + element[0].user, receiver: element[0].user + element[0].friend }, { $addToSet: { messenger: messenger_receiver.messenger } })
   }
   // $and{ sender: element.user, receiver: element.friend }, { sender: element.friend, receiver: element.user }
   const results = Messenger.find(
      {
         $and: [{
            $or:
               [
                  { sender: element[0].user + element[0].friend, receiver: element[0].friend + element[0].user },
                  { sender: element[0].friend + element[0].user, receiver: element[0].user + element[0].friend }
               ]
         }]

      })
   return results;
}

users.uploadValueMessenger = async (element) => {
   const results = await Messenger.find(
      {
         $and: [{
            $or:
               [
                  { sender: element.user + element.friend, receiver: element.friend + element.user },
                  { sender: element.friend + element.user, receiver: element.user + element.friend }
               ]
         }]

      })
   return results;
}

users.changeAvatar = async (element) => {
   const results = await User.findByIdAndUpdate(element.userId, { image: element.img })
   if (results) {
      const reuslt = await User.findById(element.userId)
      const values = {
         id: reuslt.id,
         fullname: reuslt.fullname,
         username: reuslt.username,
         image: reuslt.image
      }
      return values;
   }

}

users.getInfo = async (element) => {
   const results = await User.findById(element.userId);
   if (results) {
      const values = {
         id: results.id,
         fullname: results.fullname,
         username: results.username,
         image: results.image
      }
      return values;
   }

}
users.getListAcceptFriend = async (userId) => {

   const results = await Accept.find({ userId: userId })
      .populate(
         {
            path: "friendId",
            select: ["id", "fullname", "username", "image"]
         }
      )
      .exec();
   let acceptFriend = [];
   for(let  i = results.length-1; i >= 0; i--){
      if (results[i].userId.toString() !== results[i].send.toString()) {
         acceptFriend.push(results[i].friendId)
      }
   }
   // results.forEach(element => {

   //    if (element.userId.toString() !== element.send.toString()) {
   //       acceptFriend.push(element.friendId)
   //    }
   // })
   return acceptFriend;
}
module.exports = users;