import React,{Component} from 'react';
import {Grid,List} from 'antd-mobile';
import PropTypes from 'prop-types';
const path = 'boy.png,bull.png,chick.png,crab.png,girl.png,hedgehog.png,hippopotamus.png,koala.png,lemur.png,man.png,pig.png,tiger.png,whale.png,woman.png,zebra.png';
class AvaterSelector extends Component {
    static propTypes = {
        handleSelect:PropTypes.func.isRequired
    }
    static defaultProps = {
        handleSelect:v=>v
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSelectAvater = this.handleSelectAvater.bind(this);
    }
    handleSelectAvater(el) {
        const img = el.icon;
        this.props.handleSelect(img)
    }
    render() {
        const {avater} = this.props;
        const imgList = path.split(',').map(v=>{
            return {
                icon:require(`./img/${v}`),
                text:v.split('.')[0]
            }
        });
        const head = ()=>{
            return (
                <div>
                    {
                        avater?<div>
                              <span>已选择</span>
                              <img alt="" src={avater}   style={{"verticalAlign":"middle"}}/>
                            </div>
                            :null
                    }
                    </div>
            );
        }
        return (
            <div>
                <List renderHeader={head}>
                        <Grid data={imgList} columnNum={5}
                        onClick={el=>this.handleSelectAvater(el)}   
                        />
                    </List>

            </div>
        );
    }
}
export default AvaterSelector;

