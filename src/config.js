import axios from 'axios';

import {Toast} from 'antd-mobile';
//axios请求拦截器
let flag = false;
axios.interceptors.request.use(config=>{
    const loading = createPromise(()=>{
        Toast.loading('加载中',0,()=>{});
    });
    const timeout = createPromise(function(resolve,reject) {
        setTimeout(function() {
            resolve();
        },5000);
    });
    Promise.race([loading,timeout]).then(function(){
        if(!flag) {
            Toast.offline('Network connection failed !!!', 1);
        }
        flag = true;
    });
    return config;
})
//axios响应拦截器
axios.interceptors.response.use(config=>{
    setTimeout(()=>{
        Toast.hide();
    },500);
    flag = true;
    return config; 
});

function createPromise(fn) {
    return new Promise(fn);
}