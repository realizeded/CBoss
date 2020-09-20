import styled from 'styled-components';
const NavBarWrapper = styled.div`
    position:fixed;
    top:0;
    right:0;
    width:100%;
    z-index:11;
`;
const TabBarWrapper = styled.div`
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
`;
const ContentWrapper = styled.div`
    padding-top:45px;
    padding-bottom:50px;
`;
export {
    NavBarWrapper,
    TabBarWrapper,
    ContentWrapper
}