import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { withRouter } from 'react-router-dom';

const VocabStudyBlock = styled.div`
  .box {
    position: relative;
    border: 1px solid ${palette.gray[3]};
    background-color: ${palette.gray[2]};
    border-radius: 10px;
    height: 80px;
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
    margin: 10px;
    width: 100%;
    line-height: 80px;
    vertical-align: middle;
    font-weight: 600;
    font-size: 1.2rem;
    color: #003399;
    &:hover {
      cursor: pointer;
      background-color: ${palette.gray[8]};
      color: white;
      .sub_title {
        color: white;
      }
    }
    .sub_title {
      font-weight: 600;
      font-size: 0.9rem;
      color: ${palette.gray[8]};
    }
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
  .flex_con{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    gap:0.5%;
  }
  .flex_item{
    width:45%;
    flex-grow:1;
  }
  @media (max-width: 500px) {
    .flex_item{
      width:100%;
    }
  }
`;
const VocabStudyType = ({ history, vocabGroupData, onClickBack }) => {
  const onClickLook = useCallback(
    (group_code) => {
      history.push(`/vocab/study/look/${group_code}`);
    },
    [vocabGroupData],
  );
  const onClickMultiple = useCallback(
    (group_code) => {
      if(vocabGroupData.vocab_count >= 5){
        history.push(`/vocab/study/multiple/${group_code}`);
      }else{
        alert('5단어 이상 그룹에 할당 후 이용 부탁드립니다.');
      }
    },
    [vocabGroupData],
  );

  const onClickMultipleMean = useCallback(
    (group_code) => {
      if(vocabGroupData.vocab_count >= 5){
        history.push(`/vocab/study/multipleMean/${group_code}`);
      }else{
        alert('5단어 이상 그룹에 할당 후 이용 부탁드립니다.');
      }
    },
    [vocabGroupData],
  );

  const onClickSubjective = useCallback(
    (group_code) => {
      if(vocabGroupData.vocab_count >= 5){
        history.push(`/vocab/study/subjective/${group_code}`);
      }else{
        alert('5단어 이상 그룹에 할당 후 이용 부탁드립니다.');
      }
    },
    [vocabGroupData],
  );
  const onClickSubjectiveMean = useCallback(
    (group_code) => {
      if(vocabGroupData.vocab_count >= 5){
        history.push(`/vocab/study/subjectiveMean/${group_code}`);
      }else{
        alert('5단어 이상 그룹에 할당 후 이용 부탁드립니다.');
      }
    },
    [vocabGroupData],
  );

  return (
    <VocabStudyBlock>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <span
              className="previous"
              onClick={() => onClickBack()}
            >{`< 이전`}</span>
            <span className="group_name">{vocabGroupData.group_name}</span>
            <span className="vocab_count">
              ({vocabGroupData.vocab_count} 단어)
            </span>
          </div>
          <div className="col-12 type_select">학습 유형 선택</div>
          <div className="flex_con">
            <div
              className="box flex_item"
              onClick={() => onClickLook(vocabGroupData.group_code)}
            >
              훑어보기
            </div>
            <div
              className="box flex_item"
              onClick={() => onClickMultiple(vocabGroupData.group_code)}
            >
              객관식
              <span className="sub_title">(영단어 보고 뜻 선택)</span>
            </div>
            <div
              className="box flex_item"
              onClick={() => onClickMultipleMean(vocabGroupData.group_code)}
            >
              객관식
              <span className="sub_title">(뜻 보고 영단어 선택)</span>
            </div>
            <div
              className="box flex_item"
              onClick={() => onClickSubjective(vocabGroupData.group_code)}
            >
              주관식
              <span className="sub_title">(영단어 보고 뜻 쓰기))</span>
            </div>
            <div
              className="box flex_item"
              onClick={() => onClickSubjectiveMean(vocabGroupData.group_code)}
            >
              주관식
              <span className="sub_title">(뜻 보고 영단어 쓰기))</span>
            </div>
          </div>
        </div>
      </div>
    </VocabStudyBlock>
  );
};

export default withRouter(VocabStudyType);
