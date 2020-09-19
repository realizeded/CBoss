import React,{Component} from 'react';
import {NavBar,List,InputItem,TextareaItem,Button} from 'antd-mobile';
import AvaterSelector from '../../components/Avater-Selector';
import {FixedButtonWrapper} from './style';
import {connect} from 'react-redux';
import {saveInformation} from '../../store/actionCreator';
import {Redirect} from 'react-router-dom';
class GeniusInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avater:'',
            desc:'',
            title:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSave = this.handleSave.bind(this);
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
                avater:img
            }
        });
    }
    render() {
        const {redirceTo} = this.props;
        return (
            <div>
                {
                    redirceTo.length===0?null:<Redirect to={redirceTo}/>
                }
                 <NavBar
                    mode="dark"
                    >
                    Genius信息完善
                </NavBar>
                <AvaterSelector
                 avater={this.state.avater}
                 handleSelect={this.handleSelect}
                 />
                <List>
                    <InputItem onChange={v=>this.handleChange('title',v)}>
                    职位
                    </InputItem>
                 <TextareaItem
                     title="个人简介"
                     autoHeight
                     labelNumber={4}
                     onChange={v=>this.handleChange('desc',v)}
                     />
                </List>
                <FixedButtonWrapper>
                        <Button type="primary" onClick={this.handleSave}>保存</Button>
                    </FixedButtonWrapper>

            </div>
        );
    }
    handleSave() {
        this.props.saveInformation(this.state);
    }
}
const mapStateToProps = function(state) {
    return {
        redirceTo:state.getIn(['user','redirceTo'])
    };
}
const mapDispatchProps = function(dispatch) {
    return {
        saveInformation(data) {
            const action = saveInformation(data);
            dispatch(action);
        }
    };
}
export default connect(mapStateToProps,mapDispatchProps)(GeniusInfo);