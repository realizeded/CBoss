import React from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
function UserList(props) {
    const Header = Card.Header;
    const Body = Card.Body;
    const {userList,type} = props;
        return (
            <div>
            {
                userList.map(v=>{
                    return (
                        <Card>
                            <Header
                                title={v.get('user')}
                                thumb={v.get('avater')||""}
                                extra={v.get('title')}
                                onClick={()=>props.handleGoHeadChat(v.get('_id'))}
                            />
                            <Body style={{lineHeight:'30px'}}>
                             {
                                type==='genius'?<div>公司:{v.get('company')}</div>:null
                                }
                                <div>{type==='genius'?<span>要求:</span>:null}
                                {
                                    v.get('desc')&&v.get('desc').split('/n').map(v=>(<div>{v}</div>))
                                }
                                </div>
                                {
                                    type==='genius'?(<div>薪资:{v.get('money')}</div>):null
                                }
                               
                            </Body>
                        </Card>
                    );
                })
            }
            
        </div>
        );
}
export default UserList;