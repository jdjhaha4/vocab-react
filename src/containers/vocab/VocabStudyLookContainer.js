import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabStudyLook from '../../components/vocab/VocabStudyLook';
import { getVocabList, shuffleVocab } from '../../modules/vocab';
import { withRouter } from 'react-router-dom';
import { getVocabGroupData } from '../../modules/vocab_group';

const VocabStudyLookContainer = ({ history, match }) => {
  const [hideVocab, setHideVocab] = useState(false);
  const [hideMean, setHideMean] = useState(false);

  const onClickHideVocab = useCallback(
    (e) => {
      setHideVocab(!hideVocab);
      e.stopPropagation();
      e.preventDefault();
    },
    [hideVocab,hideMean],
  );
  const onClickHideMean = useCallback(
    (e) => {
      setHideMean(!hideMean);
      e.stopPropagation();
      e.preventDefault();
    },
    [hideMean],
  );

  const { groupcode } = match.params;
  const dispatch = useDispatch();
  const { vocabList } = useSelector(({ vocab }) => ({
    vocabList: vocab.vocabList,
  }));
  const { vocabGroupData } = useSelector(({ vocab_group }) => ({
    vocabGroupData: vocab_group.vocabGroupData,
  }));
  useEffect(() => {
    let group_code = groupcode;
    dispatch(getVocabGroupData({ group_code }));
    //dispatch(getVocabList({ groupCode: groupcode }));
  }, [groupcode]);
  const onClickBack = useCallback(() => {
    history.goBack();
  }, []);
  const onClickShuffle = useCallback(() => {
    dispatch(shuffleVocab());
  }, [vocabList]);
  return (
    <VocabStudyLook
      vocabList={vocabList}
      vocabGroupData={vocabGroupData}
      onClickBack={onClickBack}
      onClickShuffle={onClickShuffle}
      hideVocab={hideVocab}
      hideMean={hideMean}
      onClickHideVocab={onClickHideVocab}
      onClickHideMean={onClickHideMean}
    />
  );
};

export default withRouter(VocabStudyLookContainer);
