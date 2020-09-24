import styled from 'styled-components';
const ChatWrapper = styled.div`
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-color:#ecf0f1;
    .body-list {
        margin-top:45px;
    }
    .am-list-item {
        padding-left:0;
    }
    .am-list-extra {
        width:20px;
    }
`;
const Footer = styled.div`
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    z-index:9;
    .am-grid-icon {
        dispaly:none !important;
    }
    .am-grid-text {
        margin-top:0 !important;
    }
`;
const ScrollWrapper = styled.div`
    
    padding-bottom:44px;
    height:100%;
    box-sizing:border-box;
    overflow:auto;
`;
const NavBarWrapper = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index:1;
`;
export {
    NavBarWrapper,
    ChatWrapper,
    Footer,
    ScrollWrapper
};