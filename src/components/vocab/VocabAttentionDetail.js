import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const VocabAttentionDetailBlock = styled.div`
  background-color: ${palette.gray[1]};

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
  .vocab_box {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(50, 50, 50, 0.3);
    gap: 0.5em;
  }
  .vocab {
    color: #003399;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: 600;
  }
  .mean {
    font-size: 1.2rem;
    line-height: 1.2rem;
    font-weight: 600;
    color: ${palette.gray[8]};
  }
  .wrong_count {
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 600;
    color: ${palette.gray[7]};
  }

  .wrong_border {
    background-color: white;
    box-shadow: 0px 0px 20px rgba(204, 204, 204, 0.3);
    border-radius: 10px;
    padding: 0.7rem;
    margin: 10px;
  }
  .wrong_answer {
    font-size: 1.2rem;
    line-height: 1.2rem;
    font-weight: 600;
    color: ${palette.cyan[8]};
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
      <div className="vocab_box">
        <div className="vocab">{vocabAttention.vocab}</div>
        <div className="mean">{vocabAttention.mean}</div>
        <div className="wrong_count">
          오답 횟수 : {vocabAttention.wrong_count}
        </div>
      </div>
      {vocabAttentionDetailList.map((vadItem) => {
        let questionType = '';
        let answer = '';
        switch (vadItem.question_type_code) {
          case 'SV':
            questionType = '주관식(뜻 쓰기)';
            answer = (
              <div>
                다음과 같이 답했습니다 :{' '}
                <span className="wrong_answer">{vadItem.answer_mean} {vadItem.result_flag=='N'?'모름':''}</span>
              </div>
            );
            break;
          case 'SM':
            questionType = '주관식(단어 쓰기)';
            answer = (
              <div>
                다음과 같이 답했습니다 :{' '}
                <span className="wrong_answer">{vadItem.answer_vocab} {vadItem.result_flag=='N'?'모름':''}</span>
              </div>
            );
            break;
          case 'SD':
            questionType = '단어 받아쓰기';
            answer = (
              <div>
                다음과 같이 답했습니다 :{' '}
                <span className="wrong_answer">{vadItem.answer_vocab} {vadItem.result_flag=='N'?'모름':''}</span>
              </div>
            );
            break;
          case 'MV':
            questionType = '객관식(뜻 고르기)';
            answer = (
              <div>
                다음과 같이 선택했습니다 :{' '}
                <span className="wrong_answer">
                  {vadItem.answer_mean}({vadItem.answer_vocab})
                </span>
              </div>
            );
            break;
          case 'MM':
            questionType = '객관식(단어 고르기)';
            answer = (
              <div>
                다음과 같이 선택했습니다 :{' '}
                <span className="wrong_answer">
                  {vadItem.answer_mean}({vadItem.answer_vocab})
                </span>
              </div>
            );
            break;
          default:
            questionType = '문제 유형 없음';
        }
        return (
          <div key={`vadItem_${vadItem.vocab_question_result_history_id}`}>
            <div className="wrong_border">
              <div>
                {vadItem.group_name} 그룹의 {questionType}에서
              </div>
              <div>{answer}</div>
              <div>{vadItem.regist_datetime}</div>
            </div>
          </div>
        );
      })}
    </VocabAttentionDetailBlock>
  );
};

export default VocabAttentionDetail;
