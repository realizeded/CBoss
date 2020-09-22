import React,{Component} from 'react';
// import io from 'socket.io-client';
import {InputItem} from 'antd-mobile';
import {ChatWrapper,Footer,ScrollWrapper} from './style';
import {connect} from 'react-redux';
import {loadMsg,sendMsg} from '../../store/reducers/chat.redux';
/* const socket = io('http://localhost:8989'); */

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        let value = this.input.state.value;
        this.input.state.value = '';
        this.from = this.props.user.get('_id');
        this.props.sendMsg({to:this.to,from:this.from,msg:value});
    }
    render() {

        return (
        <ChatWrapper>
            <ScrollWrapper>
            <div>
                {
                    this.props.msgs.map(v=>{
                        return (<div key={v.createtime}>
                            <p >{v.get('from')}</p>
                            <p >{v.get('content')}</p>
                        </div>);
                    })
                }
                </div>
                </ScrollWrapper>
            <Footer>
                <InputItem ref={input=>this.input=input} extra={<div>发送</div>} type="text" onExtraClick={this.handleSubmit}>
                    </InputItem>
                </Footer>
        </ChatWrapper>
        );
    }
    componentDidMount() {
        let to = this.props.location.search;
        const reg = /user=(.*)/;
        this.to = reg.exec(to)[1];
    
        this.props.loadMsg();
/*         socket.on('serverMsg',data=>{
            this.setState(state=>{
                return {
                    list:[...state.list,data.text]
                }
            });
        }); */
    }
}
const mapStateToProps = function(state){
    return {
        user:state.get('user'),
        msgs:state.getIn(['chat','msgs'])
    };
}
const mapDispatchToProps = function(dispatch) {
    return {
        loadMsg() {
            const action = loadMsg();
            dispatch(action);
        },
        sendMsg(data) {
            const action = sendMsg(data);
            dispatch(action);
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat);