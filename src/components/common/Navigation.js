import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import {Link} from 'react-router-dom';
import palette from "../../lib/styles/palette";

const NavigationBlock = styled.div`
  margin-top: 15px;
`;

const Wrapper = styled(Responsive)`
  overflow: hidden;
  .item {
      float:left;
  }
  .item:first-child > a {
      border-radius: 10px 0 0 10px;
  }
  .item:last-child > a {
    border-radius: 0 10px 10px 0;
  }
    
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 2px 10px;
  border: 1px solid ${palette.gray[8]};
  
  &.active {
      background: ${palette.gray[8]};
      color: white;
  }
  
  &:hover {
      background: ${palette.gray[6]};
      color: white;
  }
  
`;

const Navigation = () =>{
    return (
        <NavigationBlock>
            <Wrapper>
                <div className="item"><StyledLink className="active">홈</StyledLink></div>
                <div className="item"><StyledLink>조사</StyledLink></div>
                <div className="item"><StyledLink>투표</StyledLink></div>
                <div className="item"><StyledLink>양식</StyledLink></div>
                <div className="item"><StyledLink>내항목</StyledLink></div>
            </Wrapper>
        </NavigationBlock>
    )
}

export default Navigation;
