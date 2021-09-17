import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { withRouter } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VocabQuestionResultGroupBlock = styled.div`
  height: calc(100vh - 150px);
  background-color: ${palette.gray[0]};

  .list_box {
    margin: 10px 0;
    padding: 15px;
    border: 1px solid ${palette.gray[2]};
    border-radius: 10px;
    background: white;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  }
`;

const VocabQuestionResultGroup = ({ vocabQuestionResultGroupList }) => {
  return (
    <VocabQuestionResultGroupBlock>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Line data={data} options={options} />
          </div>
          {vocabQuestionResultGroupList.map((item) => {
            return (
              <div key={item.update_time} className="col-12">
                <div className="list_box">
                  <div>{item.group_name}</div>
                  <div>{item.vocab_count}</div>
                  <div>{item.answer_count}</div>
                  <div>{item.wrong_answer_count}</div>
                  <div>{item.complete_flag}</div>
                  <div>{item.update_datetime}</div>
                  <div>{item.study_time_seconds}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </VocabQuestionResultGroupBlock>
  );
};

export default VocabQuestionResultGroup;
