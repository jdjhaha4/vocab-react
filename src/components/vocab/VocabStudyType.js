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
`;
const VocabStudyType = ({ history, vocabGroupData, onClickBack }) => {
  const onClickLook = useCallback(
    (group_code) => {
      history.push(`/vocab/study/look/${group_code}`);
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
          <div className="col-6">
            <div
              className="box"
              onClick={() => onClickLook(vocabGroupData.group_code)}
            >
              눈으로 훑어보기
            </div>
          </div>
          <div className="col-6">
            <div className="box">
              객관식 문제 맞추기
              <span className="sub_title">(영단어 보고 뜻 고르기)</span>
            </div>
          </div>
        </div>
      </div>
    </VocabStudyBlock>
  );
};

export default withRouter(VocabStudyType);
