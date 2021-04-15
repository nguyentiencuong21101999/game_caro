const userModel = require('./user.model');

exports.register = async (req, res, next) => {
    const { fullname, username, password } = req.body;
    const object = {
        fullname: fullname,
        username: username,
        password: password
    }
    const results = await userModel.register(object);
    res.json(results)


}
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const object = {
            username: username,
            password: password
        }
        const results = await userModel.login(object);

        res.json(results)
    } catch (error) {
        next(error)
    }
}

exports.listUser = async (req, res, next) => {
    try {
        const results = await userModel.listUser();
        res.json(results)
    } catch (error) {
        next(error)
    }
}
exports.getUserByFullname = async (req, res, next) => {
    const { txtSearch, userId } = req.body;
    try {
        const results = await userModel.getUserByFullname(txtSearch, userId);
        res.json(results)
    } catch (error) {
        next(error)
    }
}
exports.addFriend = async (req, res, next) => {
    const userId = req.body[0];
    const friendId = req.body[1];

    try {
        const results = await userModel.addFriend(userId, friendId);

        res.json({ status: "success", massage: "add success" })
    } catch (error) {
        next(error)
    }
}
exports.cancleFriend = async (req, res, next) => {
    const { userId, friendId } = req.body;
    try {
        const results = await userModel.cancleFriend(userId, friendId);
        res.json({ status: "success", massage: "cancle success" })
    } catch (error) {
        next(error)
    }
}
exports.getAccept = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const results = await userModel.getAccept(userId);
        res.json(results)
    } catch (error) {
        next(error)
    }
}
exports.getFriend = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const results = await userModel.getFriend(userId);
        res.json(results)
    } catch (error) {
        next(error)
    }
}
exports.acceptFriend = async (req, res, next) => {
    const { userId, friendId } = req.body;
    try {
        const results = await userModel.acceptFriend(userId, friendId);
        res.json(results)
    } catch (error) {
        next(error)
    }
}
exports.checkAddFriend = async (req, res, next) => {

    const { userId, friendId } = req.body;
    try {
        const results = await userModel.checkAddFriend(userId, friendId);
        res.json(results)
    } catch (error) {
        next(error)
    }
}
exports.uploadValueMessenger = async (req, res, next) => {
    try {
        const results = await userModel.uploadValueMessenger(req.body);
        res.json(results)
    } catch (error) {
        next(error)
    }
}

exports.getInfo = async (req, res, next) => {
    try {
        const results = await userModel.getInfo(req.body);
        res.json(results)
    } catch (error) {
        next(error)
    }
}

exports.getAcceptFriend = async (req, res, next) => {
    let { userId } = req.body;
    try {
        const results = await userModel.getListAcceptFriend(userId);
        res.json(results)
    } catch (error) {
        next(error)
    }
}
