import {fromJS} from 'immutable';
import {REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_SUCCESS,RELOAD_DATA} from './action-types';
import {combineReducers} from 'redux-immutable';
import {getRedircetTo} from '../util';
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
    [REGISTER_SUCCESS](state,action) {
        const {payload,type} = action;
        return state.merge({
            errMsg:'',
            isAuth:true,
            ...payload,
            redirceTo:getRedircetTo(payload.type,state.get('avater')),
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
            redirceTo:getRedircetTo(data.type,state.get('avater'))
        });
    },
    [RELOAD_DATA](state,action) {
        const {payload:data} = action;
        return state.merge({
            ...state,
            ...data,
            isAuth:true
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
    user:userReducer
});