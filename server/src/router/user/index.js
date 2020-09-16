const Router = require('express').Router();
Router.get('/info',function(req,res,next) {
    res.end(JSON.stringify({code:1}));
});
module.exports = Router;