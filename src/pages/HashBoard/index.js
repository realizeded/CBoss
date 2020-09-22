import React,{Component} from 'react';
import {NavBarWrapper,TabBarWrapper,ContentWrapper} from './style';
import { NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import NavLink from '../../components/NavLink';
import {Switch,Route} from 'react-router-dom';
import Boss from '../Boss';
// function boss(props) {
//     return (<div>genius</div>);
// }
import Genius from '../Genius';
/* function genius(props) {
    return (<div>boss</div>);
} */
import Person from '../Person';

function Msg(props) {
    return (<div>msg</div>);
}
// import Chat from '../Chat';
/* function person(props) {
    return (<div>person</div>);
}
 */
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
                component:Boss,
                path:'/boss',
                icon:'boss',
                show:type==='boss'
            },
            {
                title:"寻找工作",
                text:'boss',
                component:Genius,
                path:'/genius',

                icon:'job',
                show:type==='genius'
            },
            {
                title:"消息列表",
                text:'消息',
                component:Msg,
                path:'/msg',
                icon:'msg'
            },
            {
                title:"个人中心",
                text:'我的',
                component:Person,
                path:'/person',
                icon:'user'
            }
        ];

        const title = (NavList.find(v=>v.path.includes(pathname))).title; 
        return (
            <div>
                <NavBarWrapper>
                <NavBar
                    mode="dark"
                    >
                        {title}
                    </NavBar>
                    </NavBarWrapper>
                    <ContentWrapper>
                        <Switch>
                            {
                                NavList.map(v=>{
                                    if(v.show===false) {
                                        return null;
                                    }
                                    return (
                                        <Route key={v.path} path={v.path} component={v.component}/>
                                    )                
                                })
                            }
                        </Switch>
                    </ContentWrapper>
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