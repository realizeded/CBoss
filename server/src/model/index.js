const mongoose = require('mongoose');
const MONGOFB_URL = 'mongodb://127.0.0.1:27017/join';
mongoose.connect(MONGOFB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on('connected',err=>{
    if(err) return;
    console.log('mongodb connected');
})
const models = {
    user:{
        user:{type:String,require:true},
        pwd:{type:String,require:true},
        type:{type:String,require:true},
        avater:{type:String,require:true},
        company:{type:String,require:true},
        money:{type:String,require:true},
        desc:{type:String,require:true},
        title:{type:String,require:true}
    },
    chat:{

    }
}
for(let key in models) {
    if(models.hasOwnProperty(key)) {
        mongoose.model(key,mongoose.Schema(models[key]));
    }
}

module.exports = {
    getModel(name) {

        return mongoose.model(name);
    }
}