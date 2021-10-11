import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const AppBackgroundContainer = ({history}) => {
  const { expired } = useSelector(({ app_background }) => ({
    expired: app_background.expired,
  }));

  useEffect(() => {
    if (expired) {
      alert('토큰이 만료되었습니다. 로그인 후 이용 가능합니다.');
      history.push(`/login`);
    }
  }, [expired]);

  return null;
};

export default withRouter(AppBackgroundContainer);
