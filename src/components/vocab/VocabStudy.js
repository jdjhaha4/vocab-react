import React, { useEffect, useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { withRouter } from 'react-router-dom';

const VocabStudyBlock = styled.div`
  height: calc(100vh - 150px);
  background-color: ${palette.gray[0]};

  .box {
    height: auto;
    background-color: white;
    box-shadow: 0px 4px 20px rgba(204, 204, 204, 0.3);
    border-radius: 10px;
    margin: 10px 0;
    border: 1px solid ${palette.gray[1]};
    padding: 0.7rem;
    text-align: center;

    &:hover {
      background-color: ${palette.gray[2]};
      cursor: pointer;
    }

    .wrap {
      width: 100%;
      height: 100%;
    }
  }
  .group_name_box {
    height: auto;
  }
  .group_name {
    font-size: 1.2rem;
    color: #003399;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .vocab_count {
    margin-top: 5px;
    font-size: 1rem;
    color: ${palette.gray[8]};
    font-weight: 600;
  }
  .study_count {
    font-size: 0.8rem;
    color: ${palette.gray[6]};
    font-weight: 500;
  }
  .flex_con{
    display:flex;
    justify-content:space-between;
    gap:0.5%;
  }
  .flex_item{
    width:23.5%;
    flex-grow:1;
  }
  @media (max-width: 1024px) {
    .flex_item{
      width:45%;
    }
  }
  @media (max-width: 768px) {
    .flex_item{
      width:45%;
    }
  }
  @media (max-width: 450px) {
    .flex_item{
      width:100%;
    }
  }
`;
const VocabStudy = ({ history, vocabGroupList }) => {
  const onClickGroup = useCallback(
    (group_code) => {
      const vocabGroupItem = vocabGroupList.find(
        (item) => item.group_code === group_code,
      );
      if (vocabGroupItem.vocab_count === 0) {
        alert(
          `${vocabGroupItem.group_name} 그룹에 단어를 등록 후 선택해 주세요.`,
        );
        return;
      }
      history.push(`/vocab/study/type/${group_code}`);
    },
    [vocabGroupList],
  );

  return (
    <VocabStudyBlock>
      <div className="container">
        <div className="row flex_con">
          {vocabGroupList == null
            ? null
            : vocabGroupList.map((vocabGroupItem) => (
                <div
                  className="col-3 flex_item"
                  key={vocabGroupItem.group_code}
                  value={vocabGroupItem.group_code}
                  onClick={() => onClickGroup(vocabGroupItem.group_code)}
                >
                  <div className="wrap box">
                    <div className="group_name_box">
                      <div className="group_name">
                        {vocabGroupItem.group_name}
                      </div>
                    </div>

                    <div className="vocab_count">
                      {vocabGroupItem.vocab_count} 단어
                    </div>
                    {vocabGroupItem.update_datetime ? (
                      <>
                        <div className="study_count">
                          {vocabGroupItem.study_count}회 테스트
                        </div>
                        <div className="study_count">
                          최근 : {vocabGroupItem.update_datetime}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </VocabStudyBlock>
  );
};

export default withRouter(VocabStudy);
