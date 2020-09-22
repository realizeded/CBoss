import {fromJS} from 'immutable';
import axios from 'axios';
import io from 'socket.io-client';
import { RELOAD_DATA } from '../action-types';
const socket = io('http://localhost:8989');
//action types
const LOAD_MSG = 'LOAD_MSG';
const READ = 'READ';
const RECIVE_MSG = 'RECIVE_MSG';
//actionCreators
function getLoadMsgAction(data) {
    return {
        type:LOAD_MSG,
        payload:data
    };
}
function getReciveMsgAction(data) {
    
    return {
        type:RECIVE_MSG,
        payload:data
    };
}
export function loadMsg() {

    return dispatch=>{
        socket.on('reciveMsg',data=>{
            
            const action = getReciveMsgAction(data.data);
            dispatch(action);
        });
        axios.get('/user/msgs').then(res=>{
            if(res.status===200&&res.data.code===1) {
                //success
                const action = getLoadMsgAction(res.data.data);
                dispatch(action);
            }
        });
    };
}
export function sendMsg({from,to,msg}) {
    
    return dispatch=>{
        socket.emit('sendMsg',{from,to,content:msg})
    };
}
//defaultsttate
const defaultState = fromJS({
    msgs:[],
    unread:0
});
//actionsMethos
const actionMethods = {
    [LOAD_MSG](state,action) {
        const {payload} = action;
        return fromJS({
            msgs:[...state.get('msgs'),...payload],
            unread:payload.filter(v=>!v.read).length
        });
    },
    [RECIVE_MSG](state,action) {
        const {payload} = action;
        console.log(payload)
        let unread = state.get('unread');
        unread++;
        return {
            ...state,
            msgs:state.get('msgs').push(fromJS(payload))
        }
    }
    }

//reducers
export default function(state=defaultState,action) {
    if(actionMethods[action.type]) {
        return actionMethods[action.type](state,action);
    }
    return state;
}