import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const VocabAttentionDetailBlock = styled.div`
  .previous {
    display: inline-block;
    padding: 5px;
    background: ${palette.gray[8]};
    color: white;
    border-radius: 10px;
    margin: 10px;
    vertical-align: middle;
    &:hover {
      background: ${palette.gray[6]};
      cursor: pointer;
      border-radius: 10px;
    }
  }
`;
const VocabAttentionDetail = ({ onClickBack }) => {
  return (
    <VocabAttentionDetailBlock>
      <span className="previous" onClick={() => onClickBack()}>{`< 이전`}</span>
      요주의 단어 상세 정보
    </VocabAttentionDetailBlock>
  );
};

export default VocabAttentionDetail;
