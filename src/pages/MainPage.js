import React, { useState, useCallback } from 'react';
import Button from '../components/common/Button';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavigationContainer from '../containers/common/NavigationContainer';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import palette from '../lib/styles/palette';
import FloatingButton from '../components/common/FloatingButton';
import SurveyOrVoteSelectionModal from '../components/main/SurveyOrVoteSelectionModal';
import MainContainer from '../containers/main/MainContainer';

const Wrapper = styled(Responsive)`
  position: relative;
  margin-top: 15px;
  height: 85vh;
`;

const PageWrapper = styled.div`
  height: 100vh;
`;

const MainPage = () => {
  const [modal, setModal] = useState(false);
  const onClickPlusIcon = useCallback(() => {
    setModal(true);
  }, []);

  return (
    <PageWrapper>
      <HeaderContainer />
      <NavigationContainer />
      <Wrapper>
        <MainContainer />
      </Wrapper>
    </PageWrapper>
  );
};

export default MainPage;
