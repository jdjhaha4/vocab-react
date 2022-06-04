import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShareOthers from '../../components/share/ShareOthers';
import { getOthersShareData } from '../../modules/share';

const ShareOthersContainer = () => {
  const dispatch = useDispatch();
  const { othersShareGroupList } = useSelector(({ share }) => ({
    othersShareGroupList: share.othersShareGroupList,
  }));
  useEffect(() => {
    dispatch(getOthersShareData());
  }, []);
  return <ShareOthers othersShareGroupList={othersShareGroupList}/>;
};

export default ShareOthersContainer;
