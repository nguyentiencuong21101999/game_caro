
const express = require('express');
const app = express();
const server = require('http').Server(app);
const fullTextSearch = require('fulltextsearch');
require('dotenv').config()
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
require('./database/db.connection')
require("./helpers/redis/connect_redis")
const { handleError } = require('./helpers/error_handle/error_handle')
const userRouter = require('./modules/user.router')
app.use("/user", userRouter)
const io = require('socket.io')(server,
  {
    cors: {
      origin: "https://messengerss.herokuapp.com",
      //origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  }
)
const { router } = require('bull-board')
const { setQueue, addElementToQueue, processQueue } = require('./helpers/queue/queue')

setQueue("test");

addElementToQueue("test", obj)
processQueue("test")

app.use('/admin/queues', router)
require('./socket/socket.io')(io);


app.use((err, req, res, next) => {
  handleError(err, res)
});

server.listen(process.env.PORT || 4000, () => {
  console.log("server listening  ...");
})
