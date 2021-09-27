import React, { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { withRouter } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import moment from '../../../node_modules/moment/moment';

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

  .chart_box {
    padding: 0 10px;
  }
`;

const VocabQuestionResultGroup = ({
  vocabGroupData,
  vocabQuestionResultGroupList,
}) => {
  const data = {
    labels: [],
    datasets: [
      {
        label: '정답률',
        data: [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  {
    vocabQuestionResultGroupList.map((item) => {
      const answerRate = Math.floor(
        (item.answer_count / (item.wrong_answer_count + item.answer_count)) *
          100,
      );
      if (!isNaN(answerRate)) {
        data['labels'].push(item.update_datetime);
        data['datasets'][0]['data'].push(answerRate);
      } else {
        data['labels'].push(item.update_datetime);
        data['datasets'][0]['data'].push(0);
      }
    });
  }
  

  const plugins = [
    {
      afterDraw: (chart) => {
        // eslint-disable-next-line no-underscore-dangle
        console.log(chart);
        if (chart.tooltip._active && chart.tooltip._active.length) {
          console.log('test');
          // find coordinates of tooltip
          const activePoint = chart.tooltip._active[0];
          const { ctx } = chart;
          const { x } = activePoint.element;
          const topY = chart.scales.y.top;
          const bottomY = chart.scales.y.bottom;

          // draw vertical line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#1C2128';
          ctx.stroke();
          ctx.restore();
        }
      },
    },
  ];

  const options = {
    scales: {
      y: {
        max: 120,
        min: 0,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' %';
            }
            return label;
          },
        },
      },
    },
    tooltips: {
      mode: 'index',
      axis: 'x',
      intersect: false,
    },
    hover: {
      mode: 'index',
      axis: 'x',
      intersect: false,
    },
  };

  let preTestDate = null;

  return (
    <VocabQuestionResultGroupBlock>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>
              {vocabGroupData.group_name}({vocabGroupData.vocab_count} 단어)
            </h4>
            <h6>{vocabQuestionResultGroupList.length}회 테스트</h6>
          </div>
          <div className="col-12">
            <div className="chart_box">
              <Line plugins={plugins} data={data} options={options} />
            </div>
          </div>
          {vocabQuestionResultGroupList.map((item, index) => {
            const now = moment(item.update_datetime, 'YYYY-MM-DD hh:mm:ss');
            if (preTestDate != null) {
              var duration = moment.duration(now.diff(preTestDate));
              console.log(duration.asDays());
            }
            preTestDate = now;
            const hour = Math.floor(item.study_time_seconds / (60 * 60));
            const minute = Math.floor(
              (item.study_time_seconds % (60 * 60)) / 60,
            );
            const second = Math.floor(item.study_time_seconds % 60);

            return (
              <div key={item.update_datetime + '_' + index} className="col-12">
                <div className="list_box">
                  <div>
                    <b>{index + 1} 회차</b>
                  </div>
                  <div>
                    총 {item.vocab_count} 단어 중 정답:{item.answer_count} 오답:
                    {item.wrong_answer_count}
                  </div>
                  <div>
                    {item.complete_flag == 'T'
                      ? `${item.vocab_count} 단어 테스트 완료`
                      : `${
                          item.answer_count + item.wrong_answer_count + 1
                        } 번 째 단어 테스트 도중 종료`}
                  </div>
                  <div>
                    학습 시간: {hour}시간 {minute}분 {second}초
                  </div>
                  <div>테스트 일시: {item.update_datetime}</div>
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
