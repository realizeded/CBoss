import React,{Component} from 'react';
import {NavBar,List,InputItem,TextareaItem} from 'antd-mobile';
import AvaterSelector from '../../components/Avater-Selector';
class BossInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleChange(key,val) {
        this.setState(state=>{
            return {
                [key]:val
            }
        })
    }
    handleSelect(img) {
        this.setState(state=>{
            return {
                img
            }
        });
    }
    render() {
        return (
            <div>
                 <NavBar
                    mode="dark"
                    >
                    boss信息完善
                </NavBar>
                <AvaterSelector
                 avater={this.state.img}
                 handleSelect={this.handleSelect}
                 />
                <List>
                    <InputItem onChange={v=>this.handleChange('title',v)}>
                    招聘职位
                    </InputItem>
                    <InputItem onChange={v=>this.handleChange('company',v)}>
                    公司名称
                    </InputItem>
                    <InputItem onChange={v=>this.handleChange('money',v)}>
                    职位薪资
                    </InputItem>
                    <TextareaItem
                     title="职位要求"
                     autoHeight
                     labelNumber={4}
                     onChange={v=>this.handleChange('desc',v)}
                     />
                </List>
            </div>
        );
    }
}
export default BossInfo;