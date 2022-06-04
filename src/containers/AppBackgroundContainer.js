import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField } from '../modules/app_background';

const AppBackgroundContainer = ({history}) => {
  const dispatch = useDispatch();

  const { expired, error, errorCode } = useSelector(({ app_background }) => ({
    expired: app_background.expired,
    error: app_background.error,
    errorCode: app_background.errorCode,
  }));

  useEffect(() => {
    if (expired) {
      alert('토큰이 만료되었습니다. 로그인 후 이용 가능합니다.');
      history.push(`/login`);
    }
  }, [expired]);

  useEffect(() => {
    if (error) {
      //alert(`서버 에러가 발생했습니다.${errorCode}`);
      history.push(`/login`);
      dispatch(changeField({key:'error',value:false}));
    }
  }, [error]);

  return null;
};

export default withRouter(AppBackgroundContainer);
