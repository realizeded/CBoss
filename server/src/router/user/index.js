const Router = require('express').Router();
const models = require('../../model');
const util = require('../../util');
Router.get('/list',function(req,res) {
    const model = models.getModel('user')
    model.find({},(err,doc)=>{
        res.json(doc);
    });
});
Router.get('/info',function(req,res,next) {
    res.end(JSON.stringify({code:1}));
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
           res.json({code:1,data:doc});
        });
    },function() {
        res.json({code:12,msg:'用户已存在'})
    });
});

module.exports = Router;