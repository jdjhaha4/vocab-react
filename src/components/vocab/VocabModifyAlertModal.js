import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { ReactComponent as CloseIcon } from '../../resources/svg/close.svg';
import palette from '../../lib/styles/palette';
import produce from 'immer';

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
  position: relative;
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

  .closeBtn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
  }

  .buttons {
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.5em;
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
  @media (max-width: 490px) {
    width: 90%;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  @media (max-width: 490px) {
    flex-grow: 1;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const VocabModifyAlertModal = ({
  visible,
  title,
  id,
  vocab,
  mean,
  onCancel,
  onSaveVocabItem,
}) => {
  const fullScreen = useRef(null);
  const vocabInput = useRef(null);
  const [vocabItem, setVocabItem] = useState({ id: -1, vocab: '', mean: '' });

  useEffect(() => {
    setVocabItem({ id: id, vocab: vocab, mean: mean });
    if (visible) {
      vocabInput.current.focus();
    }
  }, [visible]);

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    const newVocabItem = produce(vocabItem, (draft) => {
      draft[name] = value;
    });
    setVocabItem(newVocabItem);
  };

  if (!visible) return null;
  return (
    <Fullscreen ref={fullScreen} tabIndex="0">
      <AlertModalBlock>
        <h2>{title}</h2>
        <p>
          단어
          <StyledInput name="vocab" ref={vocabInput} value={vocabItem.vocab||''} onChange={onChange}/>
        </p>
        <p style={{ marginTop: '10px' }}>
          뜻<StyledInput name="mean" value={vocabItem.mean||''} onChange={onChange} />
        </p>
        <div className="buttons">
          <StyledButton
            cyan
            onClick={() => {
              onSaveVocabItem(vocabItem);
            }}
          >
            저장
          </StyledButton>
          <StyledButton cyan onClick={onCancel}>
            닫기
          </StyledButton>
        </div>
        <div className="closeBtn">
          <CloseIcon onClick={onCancel} />
        </div>
      </AlertModalBlock>
    </Fullscreen>
  );
};

export default VocabModifyAlertModal;
