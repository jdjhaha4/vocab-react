import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabAttention from '../../components/vocab/VocabAttention';
import { getVocabAttentionList } from '../../modules/vocab_attention';
import { withRouter } from 'react-router-dom';

const VocabAttentionContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { vocabAttentionList } = useSelector(({ vocab_attention }) => ({
    vocabAttentionList: vocab_attention.vocabAttentionList,
  }));
  useEffect(() => {
    dispatch(getVocabAttentionList());
  }, []);

  const moveToDetail = useCallback((vocab_id) => {
    history.push(`/vocab/attention/${vocab_id}`);
  }, []);
  return (
    <VocabAttention
      vocabAttentionList={vocabAttentionList}
      moveToDetail={moveToDetail}
    />
  );
};

export default withRouter(VocabAttentionContainer);
