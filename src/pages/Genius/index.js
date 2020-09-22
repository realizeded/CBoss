import React from 'react';
import axios from 'axios';
import { Card, WhiteSpace } from 'antd-mobile';
import {getList} from '../../store/reducers/chatuser.redux';
import {connect} from 'react-redux';
import UserList from '../../components/UserList';
class Genius extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleGoHeadChat = this.handleGoHeadChat.bind(this);
    }
    render() {
        const {boss,type} = this.props;

        return (
        <UserList handleGoHeadChat={this.handleGoHeadChat}  userList={boss} type={type}/>
        );
        
    }
    handleGoHeadChat(user) {
        this.props.history.push('/chat?user='+user);
    }
    componentDidMount() {
      this.props.getList();
    }
}
const mapDispatchToProps = function(dispatch) {
    return {
        getList() {
            const action = getList('boss');
            dispatch(action);
        }
    }
}
const mapStateToProps = function(state) {
    return {
        boss:state.getIn(['chatUser','userList']),
        type:state.getIn(['user','type'])
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Genius);