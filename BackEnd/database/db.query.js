const Messenger = require('../models/messenger/messenger');

const find = async() => {
   const results = await Messenger.find();
   return results;  
}
const findByIdAndUpdate = async(id,object) =>{
    const results = await Messenger.findByIdAndUpdate(id,object)
    return results;
}
const save = async(object) =>{
    const messenger = new Messenger(object);
    const results = await messenger.save();
    return results;
}
module.exports= {
    find,
    findByIdAndUpdate,
    save
}