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
    flex-wrap:wrap;
    justify-content: flex-end;
    gap:0.5em;
  }
  .wrong_answer_count{
    font-size: 1.2rem;
    font-weight: 600;
    color: red;
  }
  @media (max-width: 490px) {
    width: 90%;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  @media (max-width: 490px) {
    flex-grow:1;
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
  vocabCount,
  answerCount,
  wrongAnswerCount,
  onClickMoveToTheResult,
}) => {
  if (!visible) return null;
  return (
    <Fullscreen>
      <AlertModalBlock>
        <h2>{title}</h2>
        <p>{answerCount}개 단어를 맞췄습니다.</p>
        <p><span className="wrong_answer_count">{wrongAnswerCount}개</span> 단어를 틀렸습니다.</p>
        <p>{studyTime.hour}시간 {studyTime.minute}분 {studyTime.second}초 동안 학습하셨습니다.</p>
        <div className="buttons">
          <StyledButton cyan onClick={onClickMoveToTheResult}>
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
