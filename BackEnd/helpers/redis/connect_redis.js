const redis = require('redis')
const config = require('../../configs/index')

const client = redis.createClient(config.redis)

client.on('connect',() =>{
    console.log('client  connected redis ...');
})
client.on('ready',() =>{
    console.log(' client connected redis and ready to use ...');
})

client.on('end',()=>{
    console.log('client disconnected redis ...');  
})
client.on("error", function(error) {
    console.error(error);
  });

module.exports = client;