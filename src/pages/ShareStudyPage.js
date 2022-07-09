import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Responsive from '../components/common/Responsive';
import { Route, Link ,useHistory} from 'react-router-dom';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavigationContainer from '../containers/common/NavigationContainer';
import palette from '../lib/styles/palette';
import { useDispatch, useSelector } from 'react-redux';
import { changeNaviSubMenu } from '../modules/navigation';
import ShareContainer from '../containers/share/ShareContainer';
import ShareOthersContainer from '../containers/share/ShareOthersContainer';
import ShareOthersTypeContainer from '../containers/share/ShareOthersTypeContainer';
import ShareOthersLookContainer from '../containers/share/ShareOthersLookContainer';
import ShareOthersMultipleContainer from '../containers/share/ShareOthersMultipleContainer';
import ShareOthersMultipleMeanContainer from '../containers/share/ShareOthersMultipleMeanContainer';
import ShareOthersSubjectiveContainer from '../containers/share/ShareOthersSubjectiveContainer';
import ShareOthersSubjectiveMeanContainer from '../containers/share/ShareOthersSubjectiveMeanContainer';
import ShareOthersDictationContainer from '../containers/share/ShareOthersDictationContainer';
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

const ShareStudyPage = () => {
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
  const onChangeSubMenuId = useCallback(
    (sub_menu_id) => {
      dispatch(changeNaviSubMenu(sub_menu_id));
    },
    [sub_menu_id],
  );

  return (
    <PageWrapper>
      <HeaderContainer />
      <NavigationContainer pageMenuId="/share" />
      <Wrapper>
        <div className="lnb">
          <LnbItem>
            <StyledLink
              className={sub_menu_id == '/share' ? 'active' : ''}
              to="/share"
              onClick={() => onChangeSubMenuId('/share')}
            >
              나의 공유
            </StyledLink>
          </LnbItem>
          <LnbItem>
            <StyledLink
              className={sub_menu_id == '/share/others' ? 'active' : ''}
              to="/share/others"
              onClick={() => onChangeSubMenuId('/share/others')}
            >
              다른사용자
            </StyledLink>
          </LnbItem>
        </div>
        <div className="page-contents">
          <Route path="/share" component={ShareContainer} exact={true} />
          <Route
            path="/share/others"
            component={ShareOthersContainer}
            exact={true}
          />
          <Route
            path="/share/others/type/:groupcode"
            component={ShareOthersTypeContainer}
          />
          <Route
            path="/share/others/look/:groupcode"
            component={ShareOthersLookContainer}
          />
          <Route
            path="/share/others/dictation/:groupcode"
            component={ShareOthersDictationContainer}
          />
          <Route
            path="/share/others/multiple/:groupcode"
            component={ShareOthersMultipleContainer}
          />
          <Route
            path="/share/others/multipleMean/:groupcode"
            component={ShareOthersMultipleMeanContainer}
          />
          <Route
            path="/share/others/subjective/:groupcode"
            component={ShareOthersSubjectiveContainer}
          />
          <Route
            path="/share/others/subjectiveMean/:groupcode"
            component={ShareOthersSubjectiveMeanContainer}
          />
        </div>
      </Wrapper>
    </PageWrapper>
  );
};

export default ShareStudyPage;
