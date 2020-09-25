import {fromJS} from 'immutable';
import axios from 'axios';
import io from 'socket.io-client';
import { RELOAD_DATA } from '../action-types';
const socket = io('http://192.168.43.229:8989');
//action types
const LOAD_MSG = 'LOAD_MSG';
const READ = 'READ';
const RECIVE_MSG = 'RECIVE_MSG';
const CHANGE_FLAG = 'CHANGE_FLAG';
const READ_MSG = 'READ_MSG';
//actionCreators
export const getChaneEnterHashBoardFlagAction = function() {
    return {
        type:CHANGE_FLAG
    }
}
function getLoadMsgAction(data) {
    return {
        type:LOAD_MSG,
        payload:data
    };
}
function getReciveMsgAction(data,userId) {
    
    return {
        type:RECIVE_MSG,
        payload:data,
        userId
    };
}
export function loadMsg(to) {

    return (dispatch,getState)=>{
        const enterHashBoardFlag = getState().getIn(['chat','enterHashBoardFlag']);
        if(!enterHashBoardFlag) {
            
            socket.on('reciveMsg',data=>{
            
                const userId = getState().getIn(['user','_id']);
                const action = getReciveMsgAction(data.data,userId);
                dispatch(action);
            });
        }
 
        axios.get('/user/msgs?to='+to).then(res=>{
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
function readMsg(payload) {
    return {
        type:READ_MSG,
        payload
    };
}
export function readCurrentMsg(from) {
   
    return (dispatch,getState)=>{
        axios.get('/user/readmsg?from='+from).then(res=>{
            if(res.status===200&&res.data.code===1) {
                const user = getState().getIn(['user','_id']);
                dispatch(readMsg({from,to:user,num:res.data.data}));
            }
        });
    }
}
//defaultsttate
const defaultState = fromJS({
    msgs:[],
    users:{},
    unread:0,
    enterHashBoardFlag:false
});
//actionsMethos
const actionMethods = {
    [READ_MSG](state,action) {
        return state.merge({
            msgs:state.get('msgs').map(v=>(fromJS({...v,read:v.get('from')===action.payload.from?true:v.get('read')}))),
            unread:(state.get('unread')-action.payload.num)
        });
    },
    [CHANGE_FLAG](state,action) {
        return state.set('enterHashBoardFlag',true);
    },
    [LOAD_MSG](state,action) {
        const {payload} = action;
        return fromJS({
            msgs:[...payload.msgs],
            users:{...payload.users},
            unread:payload.msgs.filter(v=>!v.read).length,
            enterHashBoardFlag:state.get('enterHashBoardFlag'),
            enterHashBoardFlag:true
        });
    },
    [RECIVE_MSG](state,action) {
        
        const {payload,userId} = action;
        let n = 0;
        if(userId===payload.to) {
            n =1;
        }
        // console.log(payload)
        let unread = state.get('unread');
        unread += n;
/*         return fromJS({
            unread,    
            msgs:fromJS(state.get('msgs').push(payload))
        }); */
        //set
        return state.set('msgs',[...state.get('msgs'),fromJS(payload)]).set('unread',unread).set('enterHashBoardFlag',state.get('enterHashBoardFlag'));
    }
    }

//reducers
export default function(state=defaultState,action) {
    if(actionMethods[action.type]) {
        return actionMethods[action.type](state,action);
    }
    return state;
}