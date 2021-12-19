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
const VocabAttentionDetail = ({
  onClickBack,
  vocabAttention,
  vocabAttentionDetailList,
}) => {
  return (
    <VocabAttentionDetailBlock>
      <span className="previous" onClick={() => onClickBack()}>{`< 이전`}</span>
      <div>{vocabAttention.vocab}</div>
      <div>{vocabAttention.mean}</div>
      <div>{vocabAttention.wrong_count}</div>
      {vocabAttentionDetailList.map((vadItem) => {
        let questionType = '';
        let answer = '';
        switch (vadItem.question_type_code) {
          case 'SV':
            questionType = '주관식(뜻 쓰기)';
            answer = `다음과 같이 답했습니다 : ${vadItem.answer_mean}`;
            break;
          case 'SM':
            questionType = '주관식(단어 쓰기)';
            answer = `다음과 같이 답했습니다 : ${vadItem.answer_vocab}`;
            break;
            case 'MV':
              questionType = '객관식(뜻 고르기)';
              answer = `다음과 같이 선택했습니다 : ${vadItem.answer_mean}(${vadItem.answer_vocab})`;
              break;
              case 'MM':
                questionType = '객관식(단어 고르기)';
                answer = `다음과 같이 선택했습니다 : ${vadItem.answer_vocab}(${vadItem.answer_mean})`;
            break;
          default:
            questionType = '문제 유형 없음';
        }
        return (
          <div key={`vadItem_${vadItem.vocab_question_result_history_id}`}>
            <div>{vadItem.group_name} 그룹의 {questionType}에서 {answer}</div>
          </div>
        );
      })}
    </VocabAttentionDetailBlock>
  );
};

export default VocabAttentionDetail;
