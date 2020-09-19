import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {reloadData} from '../../store/actionCreator';
class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        //获取用户信息 进行路由跳转
        const allowPath = ['/login','/register'];
        let currentRoutePath = this.props.location.pathname;
        if(allowPath.includes(currentRoutePath)) {
            return null;
        }
        axios.get('/user/info').then(res=>{
            const {data,status} = res;
            if(status===200) {
                let code = data.code;
                if(code===1) {
                    //用户已经登陆 跳转
                    this.props.handleReload(data.data);
                } else {
                    this.props.history.replace('/login');
                }
            }
        });
    }
    render() {
        return null;
    }
}
const mapStateToProps = function(data) {
    return {

    };
};
const mapDispatchToProps = function(dispatch) {
    return {
        handleReload(data) {
            const action = reloadData(data);
            dispatch(action);
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Auth));