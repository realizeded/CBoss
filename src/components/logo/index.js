import React from 'react';
import LogoImg from '../../common/img/logo.jpg';
import {LogoWrapper} from './style';
function Logo() {
    return (
        <LogoWrapper >
            <img alt="" src={LogoImg}/>
            </LogoWrapper>
    );
}
export default Logo;