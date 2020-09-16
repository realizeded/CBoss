import React from 'react';
import Logo from '../../components/logo';
import {LoginWrapper} from './style';
import {WingBlank, WhiteSpace,List, InputItem,Button} from 'antd-mobile';
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.register = this.register.bind(this);
    }
    render() {
        return (
            <LoginWrapper>
                <Logo/>
                <div>
                    <WingBlank>
                        <List>
                              <InputItem>
                                   用户
                              </InputItem>
                              <WhiteSpace size="lg"/>
                              <InputItem>
                                   密码
                              </InputItem>
                            </List>
                            </WingBlank>
                            <WhiteSpace size="lg"/>
                         <WingBlank>
                            <Button type="primary">登陆</Button>
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
}
export default Login;