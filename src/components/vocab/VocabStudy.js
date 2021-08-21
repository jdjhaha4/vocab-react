import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const VocabStudyBlock = styled.div`
  height: calc(100vh - 150px);
  background-color: ${palette.gray[0]};

  .box {
    height: 100px;
    background-color: white;
    box-shadow: 0px 4px 20px rgba(204, 204, 204, 0.3);
    border-radius: 10px;
    margin: 10px;
    border: 1px solid ${palette.gray[1]};
    padding: 0.7rem;
    text-align: center;

    &:hover {
      background-color: ${palette.gray[2]};
      cursor: pointer;
    }
  }
`;
const VocabStudy = ({ vocabGroupList }) => {
  return (
    <VocabStudyBlock>
      <div className="container">
        <div className="row">
          {vocabGroupList == null
            ? null
            : vocabGroupList.map((vocabGroupItem) => (
                <div
                  className="col-3 box"
                  key={vocabGroupItem.group_code}
                  value={vocabGroupItem.group_code}
                >
                  {vocabGroupItem.group_name}
                  <div>{vocabGroupItem.vocab_count}</div>
                </div>
              ))}
        </div>
      </div>
    </VocabStudyBlock>
  );
};

export default VocabStudy;
