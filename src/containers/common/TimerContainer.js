import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseAsync, start, stop, init } from '../../modules/timer';

const TimerContainer = () => {
  const dispatch = useDispatch();

  const { count, hour, minute, second } = useSelector(({ timer }) => ({
    count: timer.count,
    hour: timer.hour,
    minute: timer.minute,
    second: timer.second,
  }));
  return (
    <div>
      {hour}시간 {minute}분 {second}초 학습 중..
      <button
        onClick={() => {
          dispatch(start());
          dispatch(increaseAsync());
        }}
      >
        시작
      </button>
      <button
        onClick={() => {
          dispatch(stop());
        }}
      >
        종료
      </button>
      <button
        onClick={() => {
          dispatch(init());
        }}
      >
        초기화
      </button>
    </div>
  );
};

export default TimerContainer;
