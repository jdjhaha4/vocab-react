import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const VocabStudyLookBlock = styled.div`
  .vocab_item {
    border-bottom: 1px solid ${palette.gray[4]};
    margin: 0;
    display:flex;
    padding:5px;
  }
  .vocab_area{
    flex-basis:40%;
    flex-grow:0;
    flex-shrink:0;
    display:flex;
  }
  .mean_area{
    display:flex;
    align-items:center;
  }
  @media (max-width: 480px) {
    .vocab_area{
      flex-direction:column;
    }
  }
  .vocab_item:nth-child(10n + 6),
  .vocab_item:nth-child(10n + 7),
  .vocab_item:nth-child(10n + 8),
  .vocab_item:nth-child(10n + 9),
  .vocab_item:nth-child(10n + 10) {
    background: ${palette.gray[1]};
  }
  .vocab {
    color: #003399;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .phonetic{
    margin-left:5px;
    color : ${palette.gray[6]};
    font-size:0.9rem;
    font-weight: 400;
  }
  .mean {
  }

  .group_name {
    font-size: 1.2rem;
    color: #003399;
    font-weight: 600;
  }
  .vocab_count {
    font-size: 1rem;
    color: ${palette.gray[8]};
    font-weight: 600;
  }
  .type_select {
    margin-top: 10px;
    background: ${palette.gray[3]};
    font-size: 1.2rem;
    font-weight: 600;
  }
  .previous {
    display:inline-block;
    padding: 5px;
    background: ${palette.gray[8]};
    color: white;
    border-radius: 10px;
    margin-right: 10px;
    vertical-align: middle;
    &:hover {
      background: ${palette.gray[6]};
      cursor: pointer;
      border-radius: 10px;
    }
  }
  .toggle_wrap {
    height: 38px;
    margin-top: 10px;
    margin-right: 15px;
    line-height: 38px;
    vertical-align: middle;
  }
  .toggle {
    height: 100%;
    display: inline-block;
    position: relative;
  }
  .toggle input {
    display: none;
  }
  .toggle label {
    display: block;
    width: 120px;
    height: 100%;
    font-size: 1rem;
    user-select: none;
  }
  .toggle label.hide_mean {
    width: 105px;
  }
  .toggle label::before,
  .toggle label::after {
    top: 8px;
    right: 0;
    content: '';
    display: block;
    position: absolute;
    cursor: pointer;
  }
  .toggle label::before {
    width: 48px;
    height: 21px;
    background-color: ${palette.gray[4]};
    border-radius: 1rem;
    transition: background-color 0.5s ease;
  }
  .toggle label::after {
    right: 21px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.45);
    transition: right 0.3s ease;
  }
  .toggle input:checked + label::before {
    background-color: skyblue;
  }
  .toggle input:checked + label::after {
    right: 0px;
  }
  .vocab_box {
    height: calc(100vh - 250px);
    overflow: auto;
  }
  .vocab_box_list {
    position: relative;
  }
  .vocab_box_left {
    width: 42%;
    height: 100%;
    position: absolute;
    top: 0;
    display: none;
    ${(props) =>
      props.hideVocab &&
      css`
        display: block;
        background-color: ${palette.gray[2]};
      `};
  }
  .vocab_box_right {
    right: 0;
    width: 58%;
    height: 100%;
    position: absolute;
    top: 0;
    display: none;
    ${(props) =>
      props.hideMean &&
      css`
        display: block;
        background-color: ${palette.gray[2]};
      `};
  }
  .round_char {
    margin-right: 8px;
    font-size: 0.8em;
    width: 1.7em;
    border-radius: 1.5em;
    padding: 0.1em 0.1em;
    line-height: 1.25em;
    border: 1px solid ${palette.gray[6]};
    display: inline-block;
    text-align: center;
    font-weight: 500;
  }
  .flex_con {
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
  }
  .flex_con .flex_item {
    flex-basis:100%;
  }
  .flex_con2{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    align-items:baseline;
  }
  .flex_con2 span{
    flex-grow:1;
  }
  @media (max-width: 580px) {
    .flex_con2{
      justify-content:flex-end;
    }
    .flex_con2 span{
      display:none;
    }
  }
`;
const StyledButton = styled(Button)`
  float: right;
  height: 38px;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  line-height: normal;
`;
const VocabStudyLook = ({
  vocabList,
  vocabGroupData,
  onClickBack,
  onClickShuffle,
  hideVocab,
  hideMean,
  onClickHideVocab,
  onClickHideMean,
}) => {
  return (
    <VocabStudyLookBlock hideVocab={hideVocab} hideMean={hideMean}>
      <div className="">
        <div className="flex_con">
          <div className="flex_item">
            <span
              className="previous"
              onClick={() => onClickBack()}
            >{`< 이전`}</span>
            <span className="group_name">{vocabGroupData.group_name}</span>
            <span className="vocab_count">
              ({vocabGroupData.vocab_count} 단어)
            </span>
          </div>
          <div className="flex_item type_select flex_con2">
            <span>눈으로 훑어보기</span>
            <div className="toggle_wrap" onClick={(e) => onClickHideVocab(e)}>
              <div className="toggle">
                <input
                  type="checkbox"
                  id="hideVocab"
                  checked={hideVocab}
                  readOnly
                ></input>
                <label htmlFor="hideVocab">단어 가림</label>
              </div>
            </div>
            <div
              className="toggle_wrap"
              onClick={(e) => {
                onClickHideMean(e);
              }}
            >
              <div className="toggle">
                <input
                  type="checkbox"
                  id="hideMean"
                  checked={hideMean}
                  readOnly
                ></input>
                <label htmlFor="hideMean" className="hide_mean">
                  뜻 가림
                </label>
              </div>
            </div>
            <StyledButton onClick={() => onClickShuffle()}>
              단어 순서 변경
            </StyledButton>
          </div>
        </div>
        <div className="vocab_box">
          <div className="vocab_box_list">
            {vocabList.map((vocabItem, index) => (
              <div className="vocab_item" key={vocabItem.id}>
                <div
                  className=""
                  key={`${vocabItem.id}_id`}
                  style={{ textAlign: 'right' }}
                >
                  <span className="round_char">{index + 1}</span>
                </div>
                <div
                  className="vocab_area"
                  key={`${vocabItem.id}_vocab`}
                  onClick={(e) => onClickHideVocab(e)}
                >
                  <span className="vocab">
                    {vocabItem.vocab}
                  </span>
                  {vocabItem['dicArr'] != null ? (
                    <span className="phonetic">
                      [{vocabItem['dicArr'][0]['phonetic']}]
                    </span>
                  ) : null}
                </div>
                <div
                  className="mean_area"
                  key={`${vocabItem.id}_mean`}
                  onClick={(e) => {
                    onClickHideMean(e);
                  }}
                >
                  <span className="mean">{vocabItem.mean}</span>
                </div>
              </div>
            ))}
            <div
              className="vocab_box_left"
              onClick={(e) => onClickHideVocab(e)}
            ></div>
            <div
              className="vocab_box_right"
              onClick={(e) => {
                onClickHideMean(e);
              }}
            ></div>
          </div>
        </div>
      </div>
    </VocabStudyLookBlock>
  );
};

export default VocabStudyLook;
