import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabAttentionDetail from '../../components/vocab/VocabAttentionDetail';
import { withRouter } from 'react-router-dom';
import { getVocabAttentionDetailList } from '../../modules/vocab_attention';

const VocabAttentionDetailContainer = ({ history, match }) => {
  const { vocab_id } = match.params;
  const dispatch = useDispatch();
  const { vocabAttention, vocabAttentionDetailList } = useSelector(
    ({ vocab_attention }) => ({
      vocabAttention: vocab_attention.vocabAttention,
      vocabAttentionDetailList: vocab_attention.vocabAttentionDetailList,
    }),
  );

  const onClickBack = useCallback(() => {
    history.goBack();
  }, []);

  useEffect(() => {
    dispatch(getVocabAttentionDetailList({ vocab_id }));
  }, []);
  return (
    <VocabAttentionDetail
      onClickBack={onClickBack}
      vocabAttention={vocabAttention}
      vocabAttentionDetailList={vocabAttentionDetailList}
    ></VocabAttentionDetail>
  );
};

export default withRouter(VocabAttentionDetailContainer);
