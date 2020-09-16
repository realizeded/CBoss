import React from 'react';
import Logo from '../../components/logo';
import {RegisterWrapper} from './style';
import {WingBlank, WhiteSpace,List, InputItem,Button,Radio} from 'antd-mobile';
const RadioItem = Radio.RadioItem;
class Registers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            radioCheck:'genius'
        };
    }
    render() {
        const {radioCheck} = this.state;
        return (
            <RegisterWrapper>
                <Logo/>
                <div>
                    <WingBlank>
                       <List>
                        <InputItem>
                            用户
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" >
                            密码
                        </InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={radioCheck==='genius'}>
                            genius
                            </RadioItem>
                            <RadioItem checked={radioCheck==='boss'}>
                                boss
                            </RadioItem>
                        </List> 
                        </WingBlank>
                        <WhiteSpace/>
                        <WingBlank>
                            <Button type="primary">
                                注册
                                </Button>
                            </WingBlank>
                </div>
            </RegisterWrapper>
        );
    }
}
export default Registers;