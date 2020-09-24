const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const userRouter = require('./router/user');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const models = require('./model/index');
/* 
websocket 实时通讯功能
*/
io.on('connection',socket=>{
   socket.on('sendMsg',data=>{
      // console.log(data);
       data.chatId = [data.to,data.from].sort().join('-'); 
       const chat = models.getModel('chat');
       chat.create(data,(err,doc)=>{
          io.emit('reciveMsg',{data:doc});
       });
      /*    io.emit('serverMsg',data); */
   });

});

// ---------------------------------------
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user',userRouter);
server.listen(8989,err=>{
   if(!err) {
      console.log('8989------port------opened');
   } else {
      throw err;
   }

});