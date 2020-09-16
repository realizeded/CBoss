import React,{Component} from 'react';
import axios from 'axios';
class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        //获取用户信息 进行路由全球
        axios.get('/user/info').then(res=>{
            const {data} = res;
            console.log(data);
        });
    }
    render() {
        return null;
    }
}
export default Auth;