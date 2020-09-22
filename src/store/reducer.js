import {fromJS} from 'immutable';
import {CLEAR_USER,REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_SUCCESS,RELOAD_DATA,SAVE_INFORMATION} from './action-types';
import {combineReducers} from 'redux-immutable';
import {getRedircetTo} from '../util';
import cookie from 'browser-cookies';
import chatReducer from './reducers/chatuser.redux';
import chat from './reducers/chat.redux';
const defaultState = fromJS(
    {
      isAuth:false,
      user:'',
      pwd:'',
      type:'',
      errMsg:'',
      redirceTo:'',
      avater:''
    }
);
const mapActions = {
    [SAVE_INFORMATION](state,action) {
        const {payload:data,type} = action;
        return state.merge({
            ...state,
            ...data,
            redirceTo:getRedircetTo(data.type,data['avater'])
        })
    },
    [REGISTER_SUCCESS](state,action) {
        const {payload,type} = action;
        return state.merge({
            errMsg:'',
            isAuth:true,
            ...payload,
            redirceTo:getRedircetTo(payload.type,""),
        });
    },
    [REGISTER_FAIL](state,action) {
        return state.merge({
            errMsg:action.msg,
            isAuth:false,
            user:'',
            pwd:'',
            type:'',
            redirceTo:'',
            avater:''
        });
    },
    [LOGIN_SUCCESS](state,action) {
        const {payload:data} = action;
        return state.merge({
            ...data,
            isAuth:true,
            redirceTo:getRedircetTo(data.type,data['avater'])
        });
    },
    [RELOAD_DATA](state,action) {
        const {payload:data} = action;
        return state.merge({
            ...state,
            ...data,
            isAuth:true,
            
        });
    },
    [CLEAR_USER](state,action) {
        cookie.erase('userId');
        return fromJS({
            ...state,
            redirceTo:'/login',
            errMsg:''
        });

    }
};
const userReducer = function (state=defaultState,action) {
    let type = action.type;
    if(mapActions[type]) {
        return mapActions[type](state,action);
    }
    return state;
};
export default combineReducers({
    user:userReducer,
    chatUser:chatReducer,
    chat
});