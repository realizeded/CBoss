const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./router/user');
const app = express();
app.use(cookieParser());
app.use(bodyParser.json())
app.use('/user',userRouter);
app.listen(8989,err=>{
   if(!err) {
      console.log('8989------port------opened');
   } else {
      throw err;
   }

});