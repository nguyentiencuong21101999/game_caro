const express = require('express');
const router = express.Router();
const controller = require('./user.controller')
const authUser = require('./user.middleware')
router.post('/register',authUser.validateRegister,controller.register)
router.post('/login',authUser.validateLogin,controller.login)
router.get('/listUser',controller.listUser)
router.post('/getUserByFullname',controller.getUserByFullname)
router.post('/addFriend',controller.addFriend)
router.post('/cancleFriend',controller.cancleFriend)
router.post('/getAccept',controller.getAccept)
router.post('/acceptFriend',controller.acceptFriend)
router.post('/checkAddFriend',controller.checkAddFriend)
router.post("/getFriend",controller.getFriend)
router.post("/upload-value-message",controller.uploadValueMessenger)
router.post("/getInfo",controller.getInfo)
router.post("/getAcceptFriend",controller.getAcceptFriend)

module.exports = router;