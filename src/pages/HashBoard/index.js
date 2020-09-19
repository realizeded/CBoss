import React,{Component} from 'react';
import {NavBarWrapper,TabBarWrapper} from './style';
import { NavBar } from 'antd-mobile';
import {connect} from 'react-redux';
import NavLink from '../../components/NavLink';
function boss(props) {
    return (<div>genius</div>);
}
function genius(props) {
    return (<div>boss</div>);
}
function msg(props) {
    return (<div>msg</div>);
}
function person(props) {
    return (<div>person</div>);
}

class HashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        
    }
    render() {
        const {pathname} = this.props.location;
        const {type} = this.props;
        const NavList = [
            {
                title:"牛人列表",
                text:'牛人',
                component:boss,
                path:'/boss',
                icon:'boss',
                show:type==='boss'
            },
            {
                title:"寻找工作",
                text:'boss',
                component:genius,
                path:'/genius',
                icon:'job',
                show:type==='genius'
            },
            {
                title:"消息列表",
                text:'消息',
                component:msg,
                path:'/msg',
                icon:'msg'
            },
            {
                title:"个人中心",
                text:'我的',
                component:person,
                path:'/person',
                icon:'user'
            }
        ];
        const title = (NavList.find(v=>v.path===pathname)).title; 
        return (
            <div>
                <NavBarWrapper>
                <NavBar
                    mode="dark"
                    >
                        {title}
                    </NavBar>
                    </NavBarWrapper>
                    <div>content</div>
                    <TabBarWrapper>
                        <NavLink data={NavList}/>
                        </TabBarWrapper>
            </div>
        );
    }
}
const mapStateToProps = function(state) {
    return {
        type:state.getIn(['user','type'])
    }
};
export default connect(mapStateToProps,null)(HashBoard);