import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertModalBlock = styled.div`
  width: 70%;
  max-width: 650px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  h2 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  .buttons {
    margin-top:3rem;
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const QuestionResultModal = ({
  visible,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  studyTime,
}) => {
  if (!visible) return null;
  return (
    <Fullscreen>
      <AlertModalBlock>
        <h2>{title}</h2>
        <p>31개 단어 중에 1개 단어를 틀렸습니다.</p>
        <p>{studyTime.hour}시간 {studyTime.minute}분 {studyTime.second}초 동안 학습하셨습니다.</p>
        <div className="buttons">
          <StyledButton cyan onClick={onConfirm}>
            학습결과 확인
          </StyledButton>
          <StyledButton cyan onClick={onConfirm}>
            {confirmText}
          </StyledButton>
        </div>
      </AlertModalBlock>
    </Fullscreen>
  );
};

export default QuestionResultModal;
