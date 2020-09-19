import React from 'react';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
class NavLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const data = this.props.data.filter(v=>v.show!==false);
        const {pathname} = this.props.location;
        return (
          <div>
              <TabBar>
                  {
                      data.map(v=>{
                            return (
                                <TabBar.Item
                                  title={v.text}
                                  key={v.text}
                                  selected={pathname===v.path}
                                  icon={{uri:require('./imgs/'+v.icon+'.png')}}
                                  selectedIcon={{uri:require('./imgs/'+v.icon+'-active.png')}}
                                  onPress={
                                      ()=>{
                                          this.props.history.push(v.path);
                                      }
                                  }  
                                >
                                    </TabBar.Item>
                            );
                        
                      })
                  }
                  </TabBar>
          </div>  
        );
    }
}
export default withRouter(NavLink);