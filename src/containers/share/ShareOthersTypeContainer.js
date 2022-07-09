import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShareOthersType from '../../components/share/ShareOthersType';
import { withRouter } from 'react-router-dom';
import {getOthersShareVocabList, getOthersShareOneData } from '../../modules/share';

const ShareOthersTypeContainer = ({ history, match }) => {
  const { groupcode } = match.params;
  const dispatch = useDispatch();

  const { vocabGroupData } = useSelector(({ share }) => ({
    vocabGroupData: share.othersShareGroupData,
  }));

  useEffect(() => {
    let group_code = groupcode;
    dispatch(getOthersShareOneData({ group_code }));
    dispatch(getOthersShareVocabList({ group_code}));
  }, [groupcode]);

  const onClickBack = useCallback(() => {
    history.goBack();
  }, []);

  //여기서 그룹명, 그룹에 속한 단어 갯수 조회하여 전달

  return (
    <ShareOthersType vocabGroupData={vocabGroupData} onClickBack={onClickBack} />
  );
};

export default withRouter(ShareOthersTypeContainer);
