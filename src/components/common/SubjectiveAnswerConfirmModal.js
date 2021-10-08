import React, { useEffect, useRef } from 'react';
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
  width: 50%;
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
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
  }
  .wrong_answer_count {
    font-size: 1.2rem;
    font-weight: 600;
    color: red;
  }
  .vocab {
    color: #003399;
    font-size: 1.7rem;
    font-weight: 600;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const SubjectiveAnswerConfirmModal = ({
  visible,
  title,
  vocab,
  mean,
  answer,
  onClickAnswerProcess,
  onClickWrongAnswerProcess,
}) => {
  const fullScreen = useRef(null);
  let keysPressed = {};
  const onKeyDown = (e) => {
    keysPressed[e.code] = true;
  };
  const onKeyUp = (e) => {
    if (visible && keysPressed['ControlLeft'] && keysPressed['Enter']) {
      onClickWrongAnswerProcess();
    } else if (visible && keysPressed['Enter']) {
      onClickAnswerProcess();
    }
    keysPressed[e.code] = undefined;
  };

  useEffect(() => {
    if (visible) {
      fullScreen.current.focus();
    }
  }, [visible]);

  if (!visible) return null;
  return (
    <Fullscreen
      ref={fullScreen}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      tabIndex="0"
    >
      <AlertModalBlock>
        <h2>{title}</h2>
        <p>
          단어 : <span className="vocab">{vocab}</span>
        </p>
        <p>뜻 : {mean}</p>
        <p>입력한 답 : {answer}</p>
        <div className="buttons">
          <StyledButton cyan onClick={() => onClickWrongAnswerProcess()}>
            오답으로 처리(왼쪽 Ctrl + Enter)
          </StyledButton>
          <StyledButton cyan onClick={() => onClickAnswerProcess()}>
            정답으로 처리(Enter)
          </StyledButton>
        </div>
      </AlertModalBlock>
    </Fullscreen>
  );
};

export default SubjectiveAnswerConfirmModal;
