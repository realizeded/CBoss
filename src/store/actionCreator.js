import {REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_SUCCESS,RELOAD_DATA} from './action-types';
import axios from 'axios';
const getRegisterSuccessAction = function(payload) {
    return {
        type:REGISTER_SUCCESS,
        payload
    }
};
const getRegisterFailAction = function(msg) {
    return {
        type:REGISTER_FAIL,
        msg
    };
}

const register = function({user,pwd,repeatPwd,type}) {
    if(!user||!pwd||!repeatPwd||!type) {
        return getRegisterFailAction('信息不能为空');
    } 
    if(pwd!==repeatPwd) {
        return getRegisterFailAction('两次输入的密码不一样');
    }   
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type}).then(res=>{
            console.log(res);
            if(res.status===200&&res.data.code===1) {
                   dispatch(getRegisterSuccessAction({user,pwd,type})); 
            } else {
                dispatch(getRegisterFailAction(res.data.msg));
            }
        }).catch(err=>{
            dispatch(getRegisterFailAction('请求出错'));
        });
    };
}
const getLoginSuccessAction = function(data) {
    return {
        type:LOGIN_SUCCESS,
        payload:data
    }
};
const login = function(user,pwd) {
    if(!user||!pwd) {
        return getRegisterFailAction('用户、密码不能为空');
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(res=>{
            if(res.status===200&&res.data.code===1) {
                dispatch(getLoginSuccessAction(res.data.data)); 
            } else {
                dispatch(getRegisterFailAction(res.data.msg)); 
            }
        });
    };
};
const getReloadDataAction = function(data) {
    return {
        type:RELOAD_DATA,
        payload:data
    }
};
const reloadData = function(data) {
    return dispatch=>{
        const action = getReloadDataAction(data);
        dispatch(action);
    };
};
export {
    register,
    login,
    reloadData
}