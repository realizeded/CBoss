import styled from 'styled-components';
const ChatWrapper = styled.div`
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-color:#ecf0f1;
`;
const Footer = styled.div`
    position:absolute;
    bottom:0;
    left:0;
    right:0;
`;
const ScrollWrapper = styled.div`
    
    padding-bottom:44px;
    height:100%;
    box-sizing:border-box;
    overflow:auto;
`;

export {
    ChatWrapper,
    Footer,
    ScrollWrapper
};