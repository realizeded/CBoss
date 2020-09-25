import React,{Component} from 'react';
// import io from 'socket.io-client';
import {InputItem,NavBar,List,Icon,Grid} from 'antd-mobile';
import {ChatWrapper,Footer,ScrollWrapper,NavBarWrapper} from './style';
import {connect} from 'react-redux';
import {loadMsg,sendMsg,readCurrentMsg} from '../../store/reducers/chat.redux';
/* const socket = io('http://localhost:8989'); */
const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
.split(' ').filter(v=>v).map(v=>({text:v}));

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            text:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        let value = this.state.text;
        this.setState(()=>{
            return {
                text:'',
                showEmoji:false
            }
        })
        // alert(this.from);
        this.props.sendMsg({to:this.to,from:this.from,msg:value});
    }
    fixedGrid() {
        window.setTimeout(()=>{
            window.dispatchEvent(new Event('resize'));
        },0);
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
                    msgs.map((v,index)=>{
                        return (<div key={index}>
                           
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
                    <InputItem placeholder="请输入" onChange={e=>this.setState({text:e})} value={this.state.text} ref={input=>this.input=input} extra={<div><span onClick={()=>{this.setState(state=>({showEmoji:!state.showEmoji}));this.fixedGrid();}} style={{marginRight:'6px'}}>😉</span> <span onClick={this.handleSubmit}>发送</span></div>} type="text" >
                    </InputItem>
                    {
                        this.state.showEmoji?(<Grid data={emoji} columnNum={6} carouselMaxRow={4} isCarousel={true} onClick={el=>this.setState(state=>({text:state.text+el.text}))}/>):null
                    }
                    
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
    componentWillUnmount() {
        this.props.readMsg(this.to);
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
        },
        readMsg(from) {
            const action = readCurrentMsg(from);
            dispatch(action);
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat);