import React, { useState, useCallback} from 'react';
import Button from '../components/common/Button';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavigationContainer from '../containers/common/NavigationContainer';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import palette from '../lib/styles/palette';
import FloatingButton from '../components/common/FloatingButton';
import SurveyOrVoteSelectionModal from '../components/main/SurveyOrVoteSelectionModal';

const Wrapper = styled(Responsive)`
  position: relative;
  border: 1px solid black;
  margin-top: 15px;
  height: 85vh;

  .section_area {
    overflow: hidden;
  }

  .section_area .recent_item_area {
    width: 60%;
    min-height: 200px;
    border: 1px solid red;
    float: left;
  }

  .section_area .my_participation_area {
    width: 40%;
    min-height: 200px;
    border: 1px solid green;
    float: left;
  }

  .calendar_area {
    width: 100%;
    min-height: 200px;
    border: 1px solid blue;
  }
`;

const FloatingButton2 = styled.div`
  position: absolute;
  right: 30px;
  bottom: 30px;
  border: 1px solid red;
  width: 70px;
  height: 70px;
  background: red;
`;

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid green;
`;


const MainPage = () => {
  const [modal, setModal] = useState(false);
  const onClickPlusIcon = useCallback(()=>{
    setModal(true);
  },[]);

  return (
    <>
      <PageWrapper>
        <HeaderContainer />
        <NavigationContainer />
        <Wrapper>
          <div className="section_area">
            <div className="recent_item_area">최근 항목</div>
            <div className="my_participation_area">내 참여 현황</div>
          </div>
          <div className="calendar_area">달력</div>
          <FloatingButton onClickPlusIcon={onClickPlusIcon}/>
        </Wrapper>
      </PageWrapper>
      <SurveyOrVoteSelectionModal 
        visible={modal}
        title="메인"
        message="작성하실 항목을 선택하세요."
        onCancel={()=>{setModal(false)}}
      />
    </>
  );
};

export default MainPage;
