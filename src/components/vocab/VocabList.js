import React, { useEffect, useRef, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const VocabListBlock = styled.div`
  background-color: ${palette.gray[0]};

  .add {
    overflow: hidden;
  }

  label {
    padding: 10px;
  }
`;
const VocabListItem = styled.div`
  background-color: white;
  box-shadow: 0px 4px 20px rgba(204, 204, 204, 0.3);
  border-radius: 10px;
  margin: 10px;
  border: 1px solid ${palette.gray[1]};
  padding: 0.7rem;
  overflow: hidden;

  .vocab {
    float: left;
    display: block;
    width: 30%;
  }
  .mean {
    float: right;
    display: block;
    width: 65%;
  }
  .horizontal_line {
    float: left;
    display: block;
    width: 2px;
    height: 1rem;
    background-color: ${palette.gray[6]};
  }
`;

const StyledInput = styled.input`
  margin: 10px 0;
  margin-left: 5px;
  display: block;
  width: 100%;
  ${(props) =>
    props.vocab &&
    css`
      float:left;
      width: 27%;
    `};
  ${(props) =>
    props.mean &&
    css`
      float:left;
      width: 58%;
    `};
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6e707e;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    color: #6e707e;
    background-color: #fff;
    border-color: #bac8f3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(78 115 223 / 25%);
  }
  &+&{
    margin-left:10px;
  }
`;

const StyledButton = styled(Button)`
  float: right;
  height: 38px;
  margin-top: 10px;
  margin-right: 10px;
`;

const VocabList = ({
  form,
  vocabList,
  vocabError,
  onChange,
  onKeyUp,
  onAddVocab,
  getVocabList,
  onFocusComplete,
}) => {
  const vocabInputEl = useRef(null);
  const vocabInputElFocus = ()=>{
    vocabInputEl.current.focus();
  }
  //vocabListReload 가 트루로 변경될 때
  useEffect(() => {
    if(form.vocabFocus){
      vocabInputElFocus();
      onFocusComplete();
    }
  }, [form.vocabFocus]);
  return (
    <VocabListBlock>
      <label>단어 등록</label>
      <div className="add">
        <StyledInput
          ref={vocabInputEl}
          vocab="true"
          name="vocab"
          type="text"
          placeholder="영어 단어"
          value={form.vocab}
          onChange={onChange}
          autoComplete = "off"
        />
        <StyledInput
          mean="true"
          name="mean"
          type="text"
          placeholder="한글 뜻"
          value={form.mean}
          onChange={onChange}
          onKeyUp={onKeyUp}
          autoComplete = "off"
        />
        <StyledButton onClick={onAddVocab}>+</StyledButton>
      </div>
      <div>
        {vocabList.map((vocabItem) => (
          <VocabListItem key={vocabItem.id}>
            <span className="vocab">{vocabItem.vocab}</span>
            <span className="horizontal_line"></span>
            <span className="mean">{vocabItem.mean}</span>
          </VocabListItem>
        ))}
      </div>
    </VocabListBlock>
  );
};

export default VocabList;
