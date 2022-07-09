import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabStudyLook from '../../components/vocab/VocabStudyLook';
import { withRouter } from 'react-router-dom';
import { getOthersShareVocabList, getOthersShareOneData, shuffleVocab } from '../../modules/share';

const ShareOthersLookContainer = ({ history, match }) => {
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
  const { vocabList } = useSelector(({ share }) => ({
    vocabList: share.vocabList,
  }));
  const { vocabGroupData } = useSelector(({ share }) => ({
    vocabGroupData: share.othersShareGroupData,
  }));
  useEffect(() => {
    let group_code = groupcode;
    dispatch(getOthersShareOneData({ group_code }));
    //dispatch(getOthersShareVocabList({ group_code}));
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

export default withRouter(ShareOthersLookContainer);
