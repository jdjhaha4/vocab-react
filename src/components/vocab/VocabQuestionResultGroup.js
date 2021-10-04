import React, { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { withRouter } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import moment from '../../../node_modules/moment/moment';
import { cloneObject } from '../../util/arrayUtil';

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

    &:hover {
      cursor: pointer;
      background: ${palette.gray[2]};
    }
  }

  .chart_box {
    padding: 0 10px;
  }

  .border_box {
    display: inline-block;
    padding: 2px;
    margin: 2px 0 2px 10px;
    border: 1px solid ${palette.gray[3]};
    border-radius: 15px;
    background: ${palette.gray[3]};
  }
`;

const VocabQuestionResultGroup = ({
  vocabGroupData,
  vocabQuestionResultGroupList,
  moveToHistory,
}) => {
  let reversedList = cloneObject(vocabQuestionResultGroupList);
  reversedList = reversedList.reverse();
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
    vocabQuestionResultGroupList.map((item, index) => {
      const answerRate = Math.floor(
        (item.answer_count / (item.wrong_answer_count + item.answer_count)) *
          100,
      );
      let tmpItem = cloneObject(item);
      tmpItem['index_id'] = index;

      if (!isNaN(answerRate)) {
        tmpItem['answerRate'] = answerRate;
      } else {
        tmpItem['answerRate'] = 0;
      }
      data['labels'].push(index + 1 + ' 회차');
      data['datasets'][0]['data'].push(tmpItem);
    });
  }

  const plugins = [
    {
      beforeDraw: (chart) => {
        // eslint-disable-next-line no-underscore-dangle
        if (chart.getActiveElements() && chart.getActiveElements().length > 0) {
          // find coordinates of tooltip
          const activePoint = chart.getActiveElements()[0];
          const { ctx } = chart;
          const { x } = activePoint.element;
          const topY = chart.scales.y.top;
          const bottomY = chart.scales.y.bottom;

          chart.tooltip.setActiveElements(chart.getActiveElements(), 0);

          // draw vertical line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(255, 99, 132, 1)';
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
    tension: 0.3,
    parsing: {
      xAxisKey: 'id',
      yAxisKey: 'answerRate',
    },
    onClick: function (evt) {
      //evt.chart.getActiveElements()[0].index
      //evt.chart.data.datasets[0]
      const vocab_question_result_history_id=evt.chart.data.datasets[0].data[evt.chart.getActiveElements()[0].index].id
      moveToHistory(vocab_question_result_history_id);
    },
  };

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
          {reversedList.map((item, index) => {
            let speed = 0;
            let upAndDown = '';
            let answerRate = Math.floor(
              (item.answer_count /
                (item.wrong_answer_count + item.answer_count)) *
                100,
            );
            if (isNaN(answerRate)) {
              answerRate = 0;
            }
            // if((index+1) < reversedList.length){
            //   const beforeDate = moment(reversedList[index+1]['update_datetime'], 'YYYY-MM-DD hh:mm:ss');
            //   const itemDate = moment(reversedList[index]['update_datetime'], 'YYYY-MM-DD hh:mm:ss');
            //   console.log(beforeDate);
            //   console.log(itemDate);
            //   var duration = moment.duration(itemDate.diff(beforeDate));
            // }

            const hour = Math.floor(item.study_time_seconds / (60 * 60));
            const minute = Math.floor(
              (item.study_time_seconds % (60 * 60)) / 60,
            );
            const second = Math.floor(item.study_time_seconds % 60);
            if (index + 1 < reversedList.length) {
              speed =
                reversedList[index + 1].study_time_seconds -
                reversedList[index].study_time_seconds;
              if (speed > 0) {
                upAndDown = '빠름';
              } else if (speed < 0) {
                upAndDown = '느림';
              }
              speed = Math.abs(speed);
            }

            return (
              <div key={item.update_datetime + '_' + index} className="col-12">
                <div
                  className="list_box"
                  onClick={() => {
                    moveToHistory(item.id);
                  }}
                >
                  <div>
                    <b>{reversedList.length - index} 회차</b>
                  </div>
                  <div>
                    총 {item.vocab_count} 단어 중 정답:{item.answer_count} 오답:
                    {item.wrong_answer_count}
                    <span className="border_box">{`${answerRate}%`}</span>
                  </div>
                  <div>
                    {item.complete_flag == 'T' ? (
                      <>
                        {item.vocab_count} 단어 테스트
                        <span className="border_box">완료</span>
                      </>
                    ) : (
                      <>
                        {item.answer_count + item.wrong_answer_count + 1} 번 째
                        단어 테스트 도중<span className="border_box">종료</span>
                      </>
                    )}
                  </div>
                  <div>
                    학습 시간: {hour}시간 {minute}분 {second}초
                    <span className="border_box">{`${speed} 초 ${upAndDown}`}</span>
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
