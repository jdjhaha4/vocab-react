import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabAttentionDetail from '../../components/vocab/VocabAttentionDetail';
import { withRouter } from 'react-router-dom';

const VocabAttentionDetailContainer = ({history}) => {
  const onClickBack = useCallback(() => {
    history.goBack();
  }, []);
  return <VocabAttentionDetail onClickBack={onClickBack}></VocabAttentionDetail>;
};

export default withRouter(VocabAttentionDetailContainer);
