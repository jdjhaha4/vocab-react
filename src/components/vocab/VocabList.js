import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { ReactComponent as HeadPhonesIcon } from '../../resources/svg/headphones.svg';

const VocabListBlock = styled.div`
  background-color: ${palette.gray[0]};

  .vocab_list{
    height: calc(100vh - 280px);
    overflow:auto;
  }

  .add {
    overflow: hidden;
  }

  label {
    display: block;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 5px;
  }
  
  .group_select_area {
    padding: 5px;
    width: 100%;

    select {
      width: 100%;
      1px solid ${palette.gray[1]};
      padding: 10px;
      border-radius: 5px;

      option {
        margin: 3px 0;
        border: none;
      }
      option:focus {
        border: none;
      }
    }

    select:focus {
      1px solid ${palette.gray[3]};
      outline: none;
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
    display: inline-block;
    width: 28%;
    color: #003399;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .phonetic {
    margin-left: 5px;
    color: ${palette.gray[6]};
    font-size: 0.9rem;
    font-weight: 400;
  }
  .mean {
    display: inline-block;
    width: 52%;
    margin-left: 20px;
  }
  .horizontal_line {
    display: inline-block;
    width: 2px;
    height: 1rem;
    background-color: ${palette.gray[6]};
    vertical-align: middle;
  }
`;

const StyledInput = styled.input`
  margin: 10px 0;
  margin-left: 5px;
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6e707e;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  ${(props) =>
    props.vocab &&
    css`
      float: left;
      width: 27%;
      color: #003399;
      font-weight: 600;
    `};
  ${(props) =>
    props.mean &&
    css`
      float: left;
      width: 58%;
    `};
  &:focus {
    color: #6e707e;
    background-color: #fff;
    border-color: #bac8f3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(78 115 223 / 25%);
    ${(props) =>
      props.vocab &&
      css`
        color: #003399;
        font-weight: 600;
      `};
  }
  & + & {
    margin-left: 10px;
  }
  &::placeholder{
    color: ${palette.gray[4]};
  }
`;

const StyledButton = styled(Button)`
  float: right;
  height: 38px;
  margin-top: 10px;
  margin-right: 10px;
`;

const StyledButton2 = styled(Button)`
  float: right;
  height: 30px;
  padding: 0 12px;
`;
const StyledButton3 = styled(Button)`
  float: right;
  height: 30px;
  margin-right: 10px;
  padding: 0 3px;
`;

const VocabList = ({
  form,
  vocabList,
  onChange,
  onKeyUp,
  onAddVocab,
  onFocusComplete,
  onRemoveVocab,
  vocabGroupList,
  selectedGroupCode,
  onChangeGroupCode,
  addVocabLoadingFlag,
}) => {
  const vocabInputEl = useRef(null);
  const audioEl = useRef(null);
  const audioSourceEl = useRef(null);
  const vocabInputElFocus = () => {
    vocabInputEl.current.focus();
  };
  //vocabFocus 가 트루로 변경될 때
  useEffect(() => {
    if (form.vocabFocus) {
      vocabInputElFocus();
      onFocusComplete();
    }
  }, [form.vocabFocus]);
  return (
    <VocabListBlock>
      <label>단어 등록</label>
      <div className="group_select_area">
        <select
          value={selectedGroupCode}
          onChange={(e) => {
            onChangeGroupCode(e.target.value);
          }}
        >
          <option value="all">모든 단어</option>
          <option value="none">그룹이 없는 단어</option>
          {vocabGroupList == null
            ? null
            : vocabGroupList.map((vocabGroupItem) => (
                <option
                  key={vocabGroupItem.group_code}
                  value={vocabGroupItem.group_code}
                >
                  {vocabGroupItem.group_name} ({vocabGroupItem.vocab_count}{' '}
                  단어)
                </option>
              ))}
        </select>
      </div>
      <div className="add">
        <StyledInput
          ref={vocabInputEl}
          vocab="true"
          name="vocab"
          type="text"
          placeholder="영어 단어"
          value={form.vocab}
          onChange={onChange}
          autoComplete="off"
        />
        <StyledInput
          mean="true"
          name="mean"
          type="text"
          placeholder="한글 뜻"
          value={form.mean}
          onChange={onChange}
          onKeyUp={onKeyUp}
          autoComplete="off"
        />
        <StyledButton onClick={onAddVocab}>+</StyledButton>
      </div>
      <div className="vocab_list">
        {vocabList.map((vocabItem) => (
          <VocabListItem key={vocabItem.id}>
            <span className="vocab">
              {vocabItem.vocab}

              {(vocabItem['dicArr'] != null &&
              vocabItem['dicArr'][0] != null &&
              vocabItem['dicArr'][0]['phonetics'] != null &&
              vocabItem['dicArr'][0]['phonetics'].length >0) ? (
                <span className="phonetic">
                  [{vocabItem['dicArr'][0]['phonetic']}]
                </span>
              ) : null}
            </span>
            <span className="horizontal_line"></span>
            <span className="mean">{vocabItem.mean}</span>
            <StyledButton2 onClick={() => onRemoveVocab(vocabItem.id)}>
              -
            </StyledButton2>
            {vocabItem['dicArr'] != null &&
            vocabItem['dicArr'][0] != null &&
            vocabItem['dicArr'][0]['phonetics'] != null &&
            vocabItem['dicArr'][0]['phonetics'][0] != null &&
            vocabItem['dicArr'][0]['phonetics'][0]['audio'] != null ? (
              <StyledButton3
                onClick={() => {
                  if (
                    vocabItem['dicArr'][0] != null &&
                    vocabItem['dicArr'][0]['phonetics'] != null &&
                    vocabItem['dicArr'][0]['phonetics'][0] != null &&
                    vocabItem['dicArr'][0]['phonetics'][0]['audio'] != null
                  ) {
                    audioSourceEl.current.src =
                      vocabItem['dicArr'][0]['phonetics'][0]['audio'];
                    audioEl.current.pause();
                    audioEl.current.load();
                    audioEl.current.play();
                  }
                }}
              >
                <HeadPhonesIcon />
              </StyledButton3>
            ) : null}
          </VocabListItem>
        ))}
      </div>
      <audio ref={audioEl}>
        <source ref={audioSourceEl} src="" type="audio/mp3"></source>
      </audio>
      <LoadingSpinner visible={addVocabLoadingFlag} />
    </VocabListBlock>
  );
};

export default VocabList;
