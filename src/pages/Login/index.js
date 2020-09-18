import React from 'react';
import Logo from '../../components/logo';
import {LoginWrapper} from './style';
import {WingBlank, WhiteSpace,List, InputItem,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import Error from '../../components/Error';
import {login} from '../../store/actionCreator';
import {Redirect} from 'react-router-dom';
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            pwd:''
        };
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        const {errMsg,redirceTo} = this.props;
        return (
            <LoginWrapper>
                <Logo/>
                {
                    redirceTo.length===0?null:<Redirect to={redirceTo}/>
                }
                <div>
                    <WingBlank>
                        <List>
                            {
                                errMsg.length===0?null:<Error msg={errMsg}/>
                            }
                              <InputItem onChange={v=>this.handleChange('user',v)}>
                                   用户
                              </InputItem>
                              <WhiteSpace size="lg"/>
                              <InputItem type="password" onChange={v=>this.handleChange('pwd',v)}>
                                   密码
                              </InputItem>
                            </List>
                            </WingBlank>
                            <WhiteSpace size="lg"/>
                         <WingBlank>
                            <Button type="primary" onClick={this.handleLogin}>登陆</Button>
                            <WhiteSpace size="lg"/>
                            <Button type="primary" onClick={this.register}>注册</Button>
                        </WingBlank>
                    </div>
             </LoginWrapper>
        );
    }
    register() {
        // console.log(this.props);
        this.props.history.push('/Register');
    }
    handleLogin() {
        this.props.handleLogin(this.state.user,this.state.pwd);
    }
    handleChange(key,val) {
        this.setState(function(state){
            return {
                [key]:val
            }
        });
    }
}
const mapStateToProps = function(state) {
    return {
        redirceTo:state.getIn(['user','redirceTo']),
        errMsg:state.getIn(['user','errMsg'])
    };
}
const mapDispatchToProps = function(dispatch) {
    return {
        handleLogin(user,pwd) {
            const action = login(user,pwd);
            dispatch(action);
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);