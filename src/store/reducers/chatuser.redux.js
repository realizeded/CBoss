import {fromJS} from 'immutable';
import axios from 'axios';
//defaultState
const defaultState = fromJS({
    userList:[]
});
//action-types
const USER_LIST_LOAD = 'USER_LIST_LOAD';
//action-creators
const getListReloadAction = function(data) {
    return {
        type:USER_LIST_LOAD,
        payload:data
    }
}
export const getList = function(type) {
    return dispatch=>{
        axios.get('/user/list?type='+type).then(res=>{
            if(res.status===200&&res.data.code===1) {
                const action =getListReloadAction(res.data.data);
                dispatch(action);
            }
        });
    };
}
//action methods
const actionMethods = {
    [USER_LIST_LOAD](state,action) {
        const {payload:data} = action;
        return state.set('userList',fromJS(data));
    }
};

//reducer
export default function (state=defaultState,action) {
    let type = action.type;
    if(actionMethods[type]) {
        return actionMethods[type](state,action);
    }
    return state;
}
