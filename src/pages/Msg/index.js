import React from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    } 
    getLastItem(arr) {
        return arr.sort((a,b)=>a.get('createtime')-b.get('createtime'))[arr.length-1];
    }
    render() {
        const msgGroup = {};
        this.props.data.getIn(['chat','msgs']).forEach(v=>{
            msgGroup[v.get('chatId')] = msgGroup[v.get('chatId')]||[];
            msgGroup[v.get('chatId')].push(v);
        });
        const users = this.props.data.getIn(['chat','users']);
        const userInfo = this.props.data.get('user');
        if(!userInfo.get('_id')||msgGroup.length===0) {
            return null;
        }
        return (<div>
            {
                Object.values(msgGroup).sort((a,b)=>{
                    const lasta = this.getLastItem(a);
                    const lastb = this.getLastItem(b);
                    return lastb.get('createtime') - lasta.get('createtime');
                }).map(v=>{
                   
                    const lastItem = this.getLastItem(v);
                    // console.log(lastItem.get('from'),lastItem.get('to'))
                    const targteId = lastItem.get('to') === userInfo.get('_id')?lastItem.get('from'):lastItem.get('to');
                       
                    const unread = v.filter(v=>!v.get('read')&&v.get('to')===userInfo.get('_id')).length;
                    return (
                        <List>
                            <Item
                              onClick={()=>this.props.history.push('/chat?user='+targteId)}
                              thumb={users.get(targteId)?.get('avater')}
                              extra={<Badge text={unread}></Badge>
                            }
                            >

                            <div><b>{users.get(targteId)?.get('user')}</b></div>     
                            <div>
                                <Brief>{lastItem.get('content')}</Brief>
                               </div>
                                    
                                </Item>
                            </List>
                    );
                })
            }
        </div>);
    }
}
const mapStateToProps = function(state) {
    return {
        data:state
    }
}
export default connect(mapStateToProps,null)(Msg);