import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavigationContainer from '../containers/common/NavigationContainer';

const VocabStudyPage = () => {
  return (
    <>
      <HeaderContainer />
      <NavigationContainer pageMenuId="vocab"/>
      <h1>단어 공부 페이지</h1>
    </>
  );
};

export default VocabStudyPage;
