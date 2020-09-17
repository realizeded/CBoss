import {REGISTER_FAIL,REGISTER_SUCCESS} from './action-types';
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
export {
    register
}