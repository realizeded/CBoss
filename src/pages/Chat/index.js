import React,{Component} from 'react';
// import io from 'socket.io-client';
import {InputItem,NavBar,List,Icon} from 'antd-mobile';
import {ChatWrapper,Footer,ScrollWrapper,NavBarWrapper} from './style';
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
        
        this.props.sendMsg({to:this.to,from:this.from,msg:value});
    }
    render() {
        let to = this.props.location.search;
        const reg = /user=(.*)/;
        this.to = reg.exec(to)[1];
        const user = this.props.chatUsers.get(this.to);
        this.from = this.props.user.get('_id');
        //过滤接收是我或者发送是我 
        const msgs =  this.props.msgs.filter(v=>{
                return (v.get('to')===this.from||v.get('from')===this.from);
         } );

        return (
        <ChatWrapper>
              <NavBarWrapper>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                            onLeftClick={() => this.props.history.goBack()}
                    >
                        {
                            user?.get('user')

                        }
                    </NavBar>
                    </NavBarWrapper>
            <ScrollWrapper>
            <div class="body-list">
                <List>
                {
                    msgs.map(v=>{
                        return (<div key={v.get('createtime')}>
                           
                           {v.get('from')===this.from?(
                             <List.Item style={{backgroundColor:'#ecf0f1'}}
                             >
                              <div style={{textAlign:'right'}}>
                                    {v.get('content')}<img src={this.props.user.get('avater')} alt=""/>
                               </div>
                            </List.Item>):(<List.Item style={{backgroundColor:'#ecf0f1'}}><div ><img src={user.get('avater')} alt=""/>{v.get('content')}</div></List.Item>)
                            }
                           
                           
                            {/* <List.Item>{v.get('content')}</List.Item> */}
                        </div>);
                    })
                }
                </List>
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
        

        this.props.loadMsg(this.to);
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
        msgs:state.getIn(['chat','msgs']),
        chatUsers:state.getIn(['chat','users'])
    };
}
const mapDispatchToProps = function(dispatch) {
    return {
        loadMsg(to) {
            const action = loadMsg(to);
            dispatch(action);
        },
        sendMsg(data) {
            const action = sendMsg(data);
            dispatch(action);
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat);