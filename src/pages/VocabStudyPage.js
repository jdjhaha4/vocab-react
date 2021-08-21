import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavigationContainer from '../containers/common/NavigationContainer';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import { Route, Link } from 'react-router-dom';
import VocabListContainer from '../containers/vocab/VocabListContainer';
import palette from '../lib/styles/palette';
import VocabGroupListContainer from '../containers/vocab/VocabGroupListContainer';
import VocabGroupMappingListContainers from '../containers/vocab/VocabGroupMappingListContainers';
import VocabStudyContainer from '../containers/vocab/VocabStudyContainer';

const PageWrapper = styled.div`
position: relative;
`;
const Wrapper = styled(Responsive)`
  position: relative;
  margin-top: 15px;
  overflow: auto;

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
    <PageWrapper>
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
          <LnbItem>
            <StyledLink to="/vocab/group/mapping">단어 그룹화</StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink to="/vocab/study">학습하기</StyledLink>
          </LnbItem>
        </div>
        <div className="page-contents">
          <Route path="/vocab" component={VocabListContainer} exact={true} />
          <Route path="/vocab/group" component={VocabGroupListContainer} exact={true} />
          <Route path="/vocab/group/mapping" component={VocabGroupMappingListContainers} />
          <Route path="/vocab/study" component={VocabStudyContainer} />
        </div>
      </Wrapper>
    </PageWrapper>
  );
};

export default VocabStudyPage;
