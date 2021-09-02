import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const VocabStudyLookBlock = styled.div`
  .vocab_item {
    border-bottom: 1px solid ${palette.gray[4]};
    margin: 0;
  }
  .vocab_item:nth-child(10n+6)
  , .vocab_item:nth-child(10n+7)
  , .vocab_item:nth-child(10n+8)
  , .vocab_item:nth-child(10n+9)
  , .vocab_item:nth-child(10n+10) {
    background: ${palette.gray[1]};
  }
  .vocab {
    color: #003399;
    font-size: 1.2rem;
    font-weight: 600;
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
    vertical-align: middle;
    height: 60px;
    line-height: 60px;
  }
`;
const StyledButton = styled(Button)`
  float: right;
  height: 38px;
  margin-top: 10px;
  margin-right: 10px;
  line-height: normal;
`;
const VocabStudyLook = ({ vocabList, vocabGroupData }) => {
  return (
    <VocabStudyLookBlock>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <span className="group_name">{vocabGroupData.group_name}</span>
            <span className="vocab_count">
              ({vocabGroupData.vocab_count} 단어)
            </span>
          </div>
          <div className="col-4 type_select">눈으로 훑어보기</div>
          <div className="col-8 type_select">
            <StyledButton>뜻 가리기</StyledButton>
            <StyledButton>단어 가리기</StyledButton>
            <StyledButton>단어 순서 변경</StyledButton>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {vocabList.map((vocabItem) => (
              <div className="row vocab_item">
                <div className="col-4 " key={`${vocabItem.id}_vocab`}>
                  <span className="vocab">{vocabItem.vocab}</span>
                </div>
                <div className="col-8 " key={`${vocabItem.id}_mean`}>
                  <span className="mean">{vocabItem.mean}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VocabStudyLookBlock>
  );
};

export default VocabStudyLook;
