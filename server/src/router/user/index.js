const Router = require('express').Router();
const models = require('../../model');
const util = require('../../util');
const filterKey = {
    pwd:0,
    _v:0
};
Router.get('/readmsg',(req,res)=>{
    const from = req.query.from;
    const to = req.cookies.userId;
    const chat = models.getModel('chat');
    chat.updateMany({from,to},{'$set':{read:true}},(err,doc)=>{
        if(err) return res.json({code:0,msg:'更新失败'});
        res.json({code:1,data:doc.nModified})
    });
});
Router.get('/msgs',(req,res)=>{
    const userId = req.cookies.userId;
    const to = req.query.to;
    const chat = models.getModel('chat');
    const user = models.getModel('user');
    const users = {};
    let filterObj = [{from:userId,to},{to:userId,from:to}];
    if(Object.is('me',to)) {
       delete filterObj[0].to;
       delete filterObj[1].from;
    }
    console.log(filterObj)
    user.find({},(err,doc)=>{
        const users = {};
        doc.forEach(v=>{
            users[v._id] = v;
        });
        chat.find({'$or':filterObj},(err,doc)=>{
            res.json({code:1,data:{msgs:doc,users}});
        });
    });
});
Router.get('/list',function(req,res) {

    const {type} = req.query;
    const model = models.getModel('user')
    model.find({type},(err,doc)=>{
        res.json({code:1,data:doc});
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

Router.post('/update',(req,res)=>{
    const model = models.getModel('user');
    const id = req.cookies.userId;
    const body = req.body;
    model.findByIdAndUpdate(id,body,(err,doc)=>{
        if(doc) {
            const data = Object.assign({},{
                user:doc.user,
                type:doc.type
              },body);
            res.json({code:1,data});     
        } else {
            res.json({code:0,msg:'保存失败'});
        }
    });
});
module.exports = Router;