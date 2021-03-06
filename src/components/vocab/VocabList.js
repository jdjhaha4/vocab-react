import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { ReactComponent as HeadPhonesIcon } from '../../resources/svg/headphones.svg';
import VocabModifyAlertModal from './VocabModifyAlertModal';

const VocabListBlock = styled.div`
  background-color: ${palette.gray[0]};

  .vocab_list{
    height: calc(100vh - 280px);
    overflow:auto;
  }

  .add {
    overflow: hidden;
    display:flex;
    justify-content: space-between;
    gap:0.3em;
    align-items:baseline;
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
  display: flex;
  justify-content: space-between;
  gap: 0.3em;
  &:hover {
    cursor: pointer;
    background: ${palette.gray[2]};
  }
  .vocab {
    display: inline-block;
    width: 28%;
    color: #003399;
    font-size: 1.2rem;
    font-weight: 600;
    flex-grow: 0;
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
    margin-left: 15px;
    flex-grow: 1;
  }
  .horizontal_line {
    display: inline-block;
    width: 2px;
    height: 1rem;
    background-color: ${palette.gray[6]};
    vertical-align: middle;
  }

  @media (max-width: 1024px) {
    .vocab {
      width: 220px;
      flex-grow: 0;
      flex-shrink: 0;
    }
    .btn_group {
      width: 72px;
      flex-grow: 0;
      flex-shrink: 0;
    }
    .mean {
      margin-left: 8px;
    }
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    .vocab {
      width: 100%;
    }
    .horizontal_line {
      display: none;
    }
    .mean {
      width: 70%;
      margin-left: 0;
    }
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
      width: 27%;
      color: #003399;
      font-weight: 600;
      flex-grow: 1;
      flex-shrink: 0;
    `};
  ${(props) =>
    props.mean &&
    css`
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
    margin-left: 5px;
  }
  &::placeholder {
    color: ${palette.gray[4]};
  }
`;

const StyledButton = styled(Button)`
  float: right;
  height: 38px;
  align-self: stretch;
  margin-top: 12px;
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
  onUpdateVocab,
}) => {
  const vocabInputEl = useRef(null);
  const audioEl = useRef(null);
  const audioSourceEl = useRef(null);
  const vocabInputElFocus = () => {
    vocabInputEl.current.focus();
  };
  const [modifyFlag, setModifyFlag] = useState({
    visible: false,
  });
  //vocabFocus ??? ????????? ????????? ???
  useEffect(() => {
    if (form.vocabFocus) {
      vocabInputElFocus();
      onFocusComplete();
    }
  }, [form.vocabFocus]);

  const onCancelVocabModify = useCallback(()=>{
    setModifyFlag({
      visible: false,
      title: '?????? ??????',
      vocab: '',
      mean:'' ,
    });
  },[]);

  const onSaveVocabItem = useCallback(({id, vocab, mean})=>{
    onUpdateVocab({id:id, vocab: vocab, mean: mean});
    setModifyFlag({
      visible: false,
      title: '?????? ??????',
      vocab: '',
      mean:'' ,
    });
  },[]);

  const onVocabItemClick = useCallback((vocabItem) => {
    setModifyFlag({
      visible: true,
      title: '?????? ??????',
      id: vocabItem.id,
      vocab: vocabItem.vocab,
      mean: vocabItem.mean,
    });
  }, []);

  return (
    <VocabListBlock>
      <label>?????? ??????</label>
      <div className="group_select_area">
        <select
          value={selectedGroupCode}
          onChange={(e) => {
            onChangeGroupCode(e.target.value);
          }}
        >
          <option value="all">?????? ??????</option>
          <option value="none">????????? ?????? ??????</option>
          {vocabGroupList == null
            ? null
            : vocabGroupList.map((vocabGroupItem) => (
                <option
                  key={vocabGroupItem.group_code}
                  value={vocabGroupItem.group_code}
                >
                  {vocabGroupItem.group_name} ({vocabGroupItem.vocab_count}{' '}
                  ??????)
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
          placeholder="?????? ??????"
          value={form.vocab}
          onChange={onChange}
          autoComplete="off"
        />
        <StyledInput
          mean="true"
          name="mean"
          type="text"
          placeholder="?????? ???"
          value={form.mean}
          onChange={onChange}
          onKeyUp={onKeyUp}
          autoComplete="off"
        />
        <StyledButton onClick={onAddVocab}>+</StyledButton>
      </div>
      <div className="vocab_list">
        {vocabList.map((vocabItem) => {
          let phonetic = '';
          let audioMp3 = '';
          if (vocabItem['dicArr'] != null && vocabItem['dicArr'].length > 0) {
            for (var i = 0, len = vocabItem['dicArr'].length; i < len; i++) {
              if (
                vocabItem['dicArr'][i]['phonetics'] != null &&
                vocabItem['dicArr'][i]['phonetics'].length > 0
              ) {
                for (
                  var j = 0, jlen = vocabItem['dicArr'][i]['phonetics'].length;
                  j < jlen;
                  j++
                ) {
                  phonetic = vocabItem['dicArr'][i]['phonetics'][j].text;
                  audioMp3 = vocabItem['dicArr'][i]['phonetics'][j].audio;
                  if (
                    phonetic != null &&
                    phonetic != '' &&
                    audioMp3 != null &&
                    audioMp3 != ''
                  ) {
                    break;
                  }
                }
              }
            }
          }
          return (
            <VocabListItem
              key={vocabItem.id}
              onClick={(e) => onVocabItemClick(vocabItem)}
            >
              <span className="vocab">
                {vocabItem.vocab}

                {phonetic != null && phonetic != '' ? (
                  <span className="phonetic">[{phonetic}]</span>
                ) : null}
              </span>
              <span className="horizontal_line"></span>
              <span className="mean">{vocabItem.mean}</span>
              <span className="btn_group">
                <StyledButton2 onClick={(e) => onRemoveVocab(e,vocabItem.id)}>
                  -
                </StyledButton2>
                {phonetic != null &&
                phonetic != '' &&
                audioMp3 != null &&
                audioMp3 != '' ? (
                  <StyledButton3
                    onClick={(e) => {
                      if (
                        phonetic != null &&
                        phonetic != '' &&
                        audioMp3 != null &&
                        audioMp3 != ''
                      ) {
                        audioSourceEl.current.src = audioMp3;
                        audioEl.current.pause();
                        audioEl.current.load();
                        audioEl.current.oncanplaythrough = function () {
                          audioEl.current.play();
                        };
                      }
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <HeadPhonesIcon />
                  </StyledButton3>
                ) : null}
              </span>
            </VocabListItem>
          );
        })}
      </div>
      <audio ref={audioEl}>
        <source ref={audioSourceEl} src="" type="audio/mp3"></source>
      </audio>
      <LoadingSpinner visible={addVocabLoadingFlag} />
      <VocabModifyAlertModal
        title={modifyFlag.title}
        visible={modifyFlag.visible}
        id={modifyFlag.id}
        vocab={modifyFlag.vocab}
        mean={modifyFlag.mean}
        onCancel={onCancelVocabModify}
        onSaveVocabItem = {onSaveVocabItem}
      />
    </VocabListBlock>
  );
};

export default VocabList;
