import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const VocabAttentionBlock = styled.div`
  background-color: ${palette.gray[0]};

  .vocab_list {
    height: calc(100vh - 150px);
    overflow: auto;
  }

  .vocab_border {
    background-color: white;
    box-shadow: 0px 4px 20px rgba(204, 204, 204, 0.3);
    border-radius: 10px;
    padding: 0.7rem;
    margin: 10px;
    &:hover {
      cursor: pointer;
      background-color: ${palette.gray[4]};
    }
  }

  .vocab {
    display: inline-block;
    color: #003399;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .round_char {
    margin-left: 8px;
    font-size: 0.8em;
    border-radius: 1.5em;
    padding: 0.2em 0.4em;
    line-height: 1.25em;
    border: 1px solid ${palette.gray[6]};
    display: inline-block;
    text-align: center;
    font-weight: 500;
  }
`;
const VocabAttention = ({ vocabAttentionList, moveToDetail }) => {
  return (
    <VocabAttentionBlock>
      <div className="vocab_list">
        {vocabAttentionList.map((vocabAttentionItem) => (
          <div
            className="vocab_border"
            key={`vocabAttentionItem_${vocabAttentionItem.vocab_id}`}
            onClick={() => {
              moveToDetail(vocabAttentionItem.vocab_id);
            }}
          >
            <span className="vocab">{vocabAttentionItem.vocab}</span> (
            {vocabAttentionItem.mean})
            <span className="round_char">
              {vocabAttentionItem.wrong_count} 회 오답
            </span>
          </div>
        ))}
      </div>
    </VocabAttentionBlock>
  );
};

export default VocabAttention;
