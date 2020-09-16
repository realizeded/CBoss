const express = require('express');
const app = express();
const userRouter = require('./router/user');
app.use('/user',userRouter);
app.listen(8989,err=>{
   if(!err) {
      console.log('8989------port------opened');
   } else {
      throw err;
   }

});