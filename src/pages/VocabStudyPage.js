import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavigationContainer from '../containers/common/NavigationContainer';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import { Route, Link } from 'react-router-dom';
import VocabList from '../components/vocab/VocabList';
import GroupList from '../components/vocab/GroupList';
import palette from '../lib/styles/palette';

const Wrapper = styled(Responsive)`
  position: relative;
  margin-top: 15px;
  overflow: hidden;

  .lnb {
    width: 15%;
    float: left;
  }

  .page-contents {
    width: 85%;
    float: left;
  }
`;

const LnbItem = styled.div`
  height: 2.5rem;
  width: 100%;
  display: table;
  border-collapse: collapse;
  
`;

const StyledLink = styled(Link)`
  display: table-cell;
  vertical-align: middle;
  border: 1px solid ${palette.gray[3]};
  background-color: ${palette.gray[2]};
  &:hover {
    cursor: pointer;
    background-color: ${palette.gray[8]};
    color: white;
  }
  font-weight: 800;
  font-size: 1rem;
  padding:0px 10px;
`;

const VocabStudyPage = () => {
  return (
    <>
      <HeaderContainer />
      <NavigationContainer pageMenuId="vocab" />
      <Wrapper>
        <div className="lnb">
          <LnbItem>
            <StyledLink to="/vocab">단어 목록</StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink to="/vocab/group">그룹 목록</StyledLink>
          </LnbItem>
        </div>
        <div className="page-contents">
          <Route path="/vocab" component={VocabList} exact={true} />
          <Route path="/vocab/group" component={GroupList} />
        </div>
      </Wrapper>
    </>
  );
};

export default VocabStudyPage;
