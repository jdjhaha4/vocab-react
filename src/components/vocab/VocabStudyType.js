import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const VocabStudyBlock = styled.div`
  .box {
    position:relative;
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
    color:#003399;
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
`;
const VocabStudyType = ({ groupcode }) => {
  return (
    <VocabStudyBlock>
      <div className="container">
        <div className="row">
          <div className="col-12">DAY 01({groupcode})</div>
          <div className="col-12">학습 유형 선택</div>
          <div className="col-6">
            <div className="box">눈으로 훑어보기</div>
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

export default VocabStudyType;
