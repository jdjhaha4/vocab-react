import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { useEffect } from 'react';

const NavigationBlock = styled.div`
  margin-top: 15px;
  display:block;
  
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Wrapper = styled(Responsive)`
  overflow: hidden;
  .item {
    float: left;
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

const Navigation = ({ menuId, onChangeMenuId, pageMenuId }) => {
  useEffect(()=>{
    if(pageMenuId != undefined && menuId !== pageMenuId){
      onChangeMenuId(pageMenuId);
    }
  },[]);
  return (
    <NavigationBlock>
      <Wrapper>
        <div className="item">
          <StyledLink
            className={menuId === 'home' ? 'active' : ''}
            to="/"
            onClick={() => {
              onChangeMenuId('home');
            }}
          >
            홈
          </StyledLink>
        </div>
        <div className="item">
          <StyledLink
            className={menuId === 'vocab' ? 'active' : ''}
            to="/vocab"
            onClick={() => {
              onChangeMenuId('vocab');
            }}
          >
            영단어
          </StyledLink>
        </div>
        <div className="item">
          <StyledLink
            className={menuId === 'share' ? 'active' : ''}
            to="/share"
            onClick={() => {
              onChangeMenuId('share');
            }}
          >
            공유단어
          </StyledLink>
        </div>
      </Wrapper>
    </NavigationBlock>
  );
};

export default Navigation;
