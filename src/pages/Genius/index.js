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
    }
    render() {
        const {boss,type} = this.props;

        return (
        <UserList userList={boss} type={type}/>
        );
        
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