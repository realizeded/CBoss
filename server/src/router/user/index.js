const Router = require('express').Router();
const models = require('../../model');
const util = require('../../util');
const filterKey = {
    pwd:0,
    _v:0
};
Router.get('/list',function(req,res) {
    const model = models.getModel('user')
    model.find({},(err,doc)=>{
        res.json(doc);
    });
});
Router.get('/info',function(req,res,next) {
    let id = req.cookies.userId;
    const model = models.getModel('user');
    model.findOne({_id:id},filterKey,(err,doc)=>{
        if(err) {
          return  res.json({code:0,msg:'服务器故障'});
        }
        if(!doc) {
           return res.json({code:0,msg:'未查到该用户'});
        }
        res.json({code:1,data:doc});
    });
  
});
// Router.post()
Router.post('/register',function(req,res) {
    const {user,pwd,type} = req.body;
    const model = models.getModel('user');
    new Promise((resolve,reject)=>{
        model.find({user},(err,doc)=>{
            if(doc.length!=0) {
                reject();
            } 
            resolve();
        });
    }).then(function() {
        model.create({user,pwd:util.md5(pwd),type},(err,doc)=>{
            res.cookie('userId',doc._id);
            res.json({code:1,data:doc});
        });
    },function() {
        res.json({code:0,msg:'用户已存在'})
    });
});

Router.post('/login',function(req,res) {
    const {pwd,user} = req.body; 
    const model = models.getModel('user');
    try {
        model.findOne({pwd:util.md5(pwd),user},(err,doc)=>{
            if(err) throw err;

            if(!doc) {
                //fail
                res.json({code:0,msg:'登陆失败'});
            } else {
                //success
                res.cookie('userId',doc._id);
                res.end(JSON.stringify({code:1,data:doc}));
            }
        });
    }catch(e) {
        res.json({code:500,msg:'服务器故障'});
    }
});
module.exports = Router;