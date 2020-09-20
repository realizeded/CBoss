import React from 'react';
import axios from 'axios';
import { Card, WhiteSpace } from 'antd-mobile';
import {getList} from '../../store/reducers/chatuser.redux';
import {connect} from 'react-redux';
import UserList from '../../components/UserList';
class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {genius} = this.props;
        return (<UserList userList={genius}/>)
    }
    componentDidMount() {
      this.props.getList();
    }
}
const mapDispatchToProps = function(dispatch) {
    return {
        getList() {
            const action = getList('genius');
            dispatch(action);
        }
    }
}
const mapStateToProps = function(state) {
    return {
        genius:state.getIn(['chatUser','userList'])
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Boss);