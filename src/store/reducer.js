import {fromJS} from 'immutable';
import {REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_SUCCESS} from './action-types';
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
            redirceTo:getRedircetTo(type,state.get('avater')),
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
        const {payload:data,type} = action;
        return state.merge({
            ...data,
            redirceTo:getRedircetTo(type,state.get('avater'))
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