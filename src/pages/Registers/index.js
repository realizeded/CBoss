import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Logo from '../../components/logo';
import {RegisterWrapper} from './style';
import {register} from '../../store/actionCreator';
import {WingBlank, WhiteSpace,List, InputItem,Button,Radio} from 'antd-mobile';
import Error  from '../../components/Error';
const RadioItem = Radio.RadioItem;

class Registers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            type:'genius',
            user:'',
            pwd:'',
            repeatPwd:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange(key,val) {
        this.setState((state)=>{
            return {
                [key]:val
            };
        });
    }
    handleRegister() {
        this.props.handleRegister(this.state);
    }
    render() {
        const {type} = this.state;
        const {readirctToPath,errMsg} = this.props;
        return (
            <RegisterWrapper>
                {readirctToPath.length===0?null:<Redirect to={readirctToPath}/>}
                <Logo/>
                <div>
                    <WingBlank>
                    
                       <List>
                       {
                          errMsg.length ===0?null:<Error msg={errMsg}/>
                       }
                        <InputItem
                         onChange={v=>this.handleChange('user',v)}
                        >
                            用户
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" 
                         onChange={v=>this.handleChange('pwd',v)}
                        >
                            密码
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" 
                         onChange={v=>this.handleChange('repeatPwd',v)}   
                        >
                            确认密码
                        </InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={type==='genius'}
                         onChange={v=>this.handleChange('type','genius')}
                        >
                            genius
                            </RadioItem>
                        <RadioItem checked={type==='boss'} onChange={v=>this.handleChange('type','boss')}>
                                boss
                            </RadioItem>
                        </List> 
                        </WingBlank>
                        <WhiteSpace/>
                        <WingBlank>
                            <Button type="primary" onClick={this.handleRegister}>
                                注册
                                </Button>
                            </WingBlank>
                </div>
            </RegisterWrapper>
        );
    }
}
const mapStateToProps = function(state) {
    return {
        readirctToPath:state.getIn(['user','redirceTo']),
        errMsg:state.getIn(['user','errMsg'])
    };
}
const mapDispatchToProps = function(dispatch) {
    return {
        handleRegister(payload) {
            const action  = register(payload);
            dispatch(action);
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Registers);