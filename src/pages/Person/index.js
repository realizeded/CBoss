import React,{Component} from 'react';
import {Result,Icon,List,Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import cookies from 'browser-cookies';
import {Em} from './styled';
import {clearUserInfo} from '../../store/actionCreator';
import {Redirect} from 'react-router-dom';
const alert = Modal.alert;
class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handlePageScroll = this.handlePageScroll.bind(this);
    }
    handleAlterConfirm() {
       /*  cookies.set('userId','');
        window.location.reload(true); */
        this.props.logOut();
    }
    render() {
        const user = this.props.user;
        const redirectTo = user.get('redirceTo')||'';
        const Item = List.Item;
        if(redirectTo==='/login') {
           
            return <Redirect to={redirectTo}/>;
        }
        return (
            <div>
                <Result 
                    img={(<img  src={user.get('avater')} alt="" style={{width:'70px'}}/>)}
                    title={user.get('user')}
                    message={user.get('type')==='boss'?user.get('title'):''}
                />
                <List renderHeader={()=>'简介'}>
                    <Item>
                        {
                            user.get('type')==='boss'?(<div>公司:{user.get('company')}</div>):''
                        }
                        {user.get('desc')&&user.get('desc').split('\n').map(v=> {
                            return (<div>
                                {
                                    v
                                }
                            </div>);
                        })}
                        {
                            user.get('type')==='boss'?(<div>薪资:{user.get('money')}</div>):''
                        }
                    </Item>
                </List>
                <List renderHeader={()=>'操作'}>
                    <Item multipleLine > 
                        <Em onClick={()=>alert('注销', '确定注销吗???', [
                            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                            { text: '确定', onPress: () => this.handleAlterConfirm() }
                        ])}>注销</Em>
                    </Item>
                </List>

            </div>
        );
    }
    componentDidMount() {
        const {pathname} = this.props.location;
        if(pathname==='/boss'||pathname==='genius') {
            this.handlePageScroll();
        }
    }
    handlePageScroll() {

    }
}
const mapStateToProps = function(state){
    return {
        user:state.get('user')
    }
}
const mapDispatchToProps = function(dispatch) {
    return {
        logOut() {
            const action = clearUserInfo();
            dispatch(action);
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Person);