import React, { useCallback } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { changeNaviSubMenu } from '../modules/navigation';
import VocabStudyTypeContainer from '../containers/vocab/VocabStudyTypeContainer';
import VocabStudyLookContainer from '../containers/vocab/VocabStudyLookContainer';
import VocabStudyMultipleContainer from '../containers/vocab/VocabStudyMultipleContainer';
import VocabQuestionResultContainer from '../containers/vocab/VocabQuestionResultContainer';

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
  &.active {
    background-color: ${palette.gray[8]};
    color: white;
  }
  font-weight: 800;
  font-size: 1rem;
  padding: 0px 10px;
`;

const VocabStudyPage = () => {
  const dispatch = useDispatch();
  const { sub_menu_id } = useSelector(({ navigation }) => ({
    sub_menu_id: navigation.sub_menu_id,
  }));
  const onChangeSubMenuId = useCallback(
    (sub_menu_id) => {
      dispatch(changeNaviSubMenu(sub_menu_id));
    },
    [sub_menu_id],
  );
  return (
    <PageWrapper>
      <HeaderContainer />
      <NavigationContainer pageMenuId="vocab" />
      <Wrapper>
        <div className="lnb">
          <LnbItem>
            <StyledLink
              className={sub_menu_id=='vocab'?'active':''}
              to="/vocab"
              onClick={() => onChangeSubMenuId('vocab')}
            >
              단어 목록
            </StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink
              className={sub_menu_id=='vocab/group'?'active':''}
              to="/vocab/group"
              onClick={() => onChangeSubMenuId('vocab/group')}
            >
              그룹 목록
            </StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink
              className={sub_menu_id=='vocab/group/mapping'?'active':''}
              to="/vocab/group/mapping"
              onClick={() => onChangeSubMenuId('vocab/group/mapping')}
            >
              단어 그룹화
            </StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink
              className={sub_menu_id=='vocab/study'?'active':''}
              to="/vocab/study"
              onClick={() => onChangeSubMenuId('vocab/study')}
            >
              학습하기
            </StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink
              className={sub_menu_id=='vocab/question/result'?'active':''}
              to="/vocab/question/result"
              onClick={() => onChangeSubMenuId('vocab/question/result')}
            >
              학습결과
            </StyledLink>
          </LnbItem>
        </div>
        <div className="page-contents">
          <Route path="/vocab" component={VocabListContainer} exact={true} />
          <Route
            path="/vocab/group"
            component={VocabGroupListContainer}
            exact={true}
          />
          <Route
            path="/vocab/group/mapping"
            component={VocabGroupMappingListContainers}
          />
          <Route path="/vocab/study" exact component={VocabStudyContainer} />
          <Route path="/vocab/study/type" exact render={()=><div>학습 하실 그룹을 선택해 주세요.</div>} />
          <Route path="/vocab/study/type/:groupcode" component={VocabStudyTypeContainer} />
          <Route path="/vocab/study/look/:groupcode" component={VocabStudyLookContainer} />
          <Route path="/vocab/study/multiple/:groupcode" component={VocabStudyMultipleContainer} />
          <Route path="/vocab/question/result" component={VocabQuestionResultContainer} />
        </div>
      </Wrapper>
    </PageWrapper>
  );
};

export default VocabStudyPage;
