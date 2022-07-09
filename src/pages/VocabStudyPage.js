import React, { useCallback, useState, useEffect } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavigationContainer from '../containers/common/NavigationContainer';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import { Route, Link , useHistory } from 'react-router-dom';
import VocabListContainer from '../containers/vocab/VocabListContainer';
import palette from '../lib/styles/palette';
import VocabGroupListContainer from '../containers/vocab/VocabGroupListContainer';
import VocabGroupMappingListContainers from '../containers/vocab/VocabGroupMappingListContainers';
import VocabStudyContainer from '../containers/vocab/VocabStudyContainer';
import { useDispatch, useSelector } from 'react-redux';
import { changeNaviSubMenu } from '../modules/navigation';
import VocabStudyTypeContainer from '../containers/vocab/VocabStudyTypeContainer';
import VocabStudyLookContainer from '../containers/vocab/VocabStudyLookContainer';
import VocabStudyDictationContainer from '../containers/vocab/VocabStudyDictationContainer';
import VocabStudyMultipleContainer from '../containers/vocab/VocabStudyMultipleContainer';
import VocabStudyMultipleMeanContainer from '../containers/vocab/VocabStudyMultipleMeanContainer';
import VocabQuestionResultContainer from '../containers/vocab/VocabQuestionResultContainer';
import VocabQuestionResultGroupContainer from '../containers/vocab/VocabQuestionResultGroupContainer';
import VocabQuestionResultHistoryContainer from '../containers/vocab/VocabQuestionResultHistoryContainer';
import VocabStudySubjectiveContainer from '../containers/vocab/VocabStudySubjectiveContainer';
import VocabStudySubjectiveMeanContainer from '../containers/vocab/VocabStudySubjectiveMeanContainer';
import VocabAttentionContainer from '../containers/vocab/VocabAttentionContainer';
import VocabAttentionDetailContainer from '../containers/vocab/VocabAttentionDetailContainer';

const PageWrapper = styled.div`
  position: relative;
`;
const Wrapper = styled(Responsive)`
  position: relative;
  margin-top: 15px;
  overflow: auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
    .lnb {
      display: none;
    }
  }
  .lnb {
    width: 120px;
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .page-contents {
    flex-grow: 1;
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
  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          dispatch(changeNaviSubMenu(history.location.pathname));
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
          dispatch(changeNaviSubMenu(history.location.pathname));
          // Handle back event
        }
      }
    });
  }, [locationKeys]);

  const { sub_menu_id } = useSelector(({ navigation }) => ({
    sub_menu_id: navigation.sub_menu_id,
  }));
  const {timer_flag} = useSelector(({ timer }) => ({
    timer_flag: timer.flag,
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
      <NavigationContainer pageMenuId="/vocab" />
      <Wrapper>
        <div className="lnb">
          <LnbItem>
            <StyledLink
              className={sub_menu_id == '/vocab' ? 'active' : ''}
              to="/vocab"
              onClick={() => onChangeSubMenuId('/vocab')}
              replace={timer_flag}
            >
              단어 목록
            </StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink
              className={sub_menu_id == '/vocab/group' ? 'active' : ''}
              to="/vocab/group"
              onClick={() => onChangeSubMenuId('/vocab/group')}
              replace={timer_flag}
            >
              그룹 목록
            </StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink
              className={sub_menu_id == '/vocab/group/mapping' ? 'active' : ''}
              to="/vocab/group/mapping"
              onClick={() => onChangeSubMenuId('/vocab/group/mapping')}
              replace={timer_flag}
            >
              단어 그룹화
            </StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink
              className={sub_menu_id == '/vocab/study' ? 'active' : ''}
              to="/vocab/study"
              onClick={() => onChangeSubMenuId('/vocab/study')}
              replace={timer_flag}
            >
              학습하기
            </StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink
              className={sub_menu_id == '/vocab/question/result' ? 'active' : ''}
              to="/vocab/question/result"
              onClick={() => onChangeSubMenuId('/vocab/question/result')}
              replace={timer_flag}
            >
              학습결과
            </StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink
              className={sub_menu_id == '/vocab/attention' ? 'active' : ''}
              to="/vocab/attention"
              onClick={() => onChangeSubMenuId('/vocab/attention')}
              replace={timer_flag}
            >
              요주의 단어
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
          <Route
            path="/vocab/study/type"
            exact
            render={() => <div>학습 하실 그룹을 선택해 주세요.</div>}
          />
          <Route
            path="/vocab/study/type/:groupcode"
            component={VocabStudyTypeContainer}
          />
          <Route
            path="/vocab/study/look/:groupcode"
            component={VocabStudyLookContainer}
          />
          <Route
            path="/vocab/study/dictation/:groupcode"
            component={VocabStudyDictationContainer}
          />
          <Route
            path="/vocab/study/multiple/:groupcode"
            component={VocabStudyMultipleContainer}
          />
          <Route
            path="/vocab/study/multipleMean/:groupcode"
            component={VocabStudyMultipleMeanContainer}
          />
          <Route
            path="/vocab/study/subjective/:groupcode"
            component={VocabStudySubjectiveContainer}
          />
          <Route
            path="/vocab/study/subjectiveMean/:groupcode"
            component={VocabStudySubjectiveMeanContainer}
          />
          <Route
            path="/vocab/question/result"
            exact
            component={VocabQuestionResultContainer}
          />
          <Route
            path="/vocab/question/result/:groupcode"
            component={VocabQuestionResultGroupContainer}
          />
          <Route
            path="/vocab/question/history/:vocab_question_result_id"
            component={VocabQuestionResultHistoryContainer}
          />
          <Route
            path="/vocab/attention"
            component={VocabAttentionContainer}
            exact
          />
          <Route
            path="/vocab/attention/:vocab_id"
            component={VocabAttentionDetailContainer}
          />
        </div>
      </Wrapper>
    </PageWrapper>
  );
};

export default VocabStudyPage;
