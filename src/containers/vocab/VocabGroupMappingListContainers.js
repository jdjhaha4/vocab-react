import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabGroupMappingList from '../../components/vocab/VocabGroupMappingList';
import { getVocabGroupList } from '../../modules/vocab_group';
import { getVocabList, changeSelectedGroupCode } from '../../modules/vocab';
import {
  changeGroupCode,
  getVocabGroupMappingList,
  addVocabGroupMapping,
  removeVocabGroupMapping,
} from '../../modules/vocab_mapping';

const VocabGroupMappingListContainers = () => {
  const dispatch = useDispatch();

  const { vocabGroupList } = useSelector(({ vocab_group }) => ({
    vocabGroupList: vocab_group.vocabGroupList,
  }));

  const { vocabList, vocabListReload, vocabSelectedGroupCode } = useSelector(
    ({ vocab }) => ({
      vocabList: vocab.vocabList,
      vocabListReload: vocab.vocabListReload,
      vocabSelectedGroupCode: vocab.selectedGroupCode,
    }),
  );

  const {
    vocabGroupMappingList,
    selectedGroupCode,
    selectedGroupName,
    vocabGroupMappingListReload,
  } = useSelector(({ vocab_group_mapping }) => ({
    vocabGroupMappingList: vocab_group_mapping.vocabGroupMappingList,
    selectedGroupCode: vocab_group_mapping.groupCode,
    selectedGroupName: vocab_group_mapping.groupName,
    vocabGroupMappingListReload:
      vocab_group_mapping.vocabGroupMappingListReload,
  }));

  const onChangeVocabGroupCode = useCallback((groupCode) => {
    dispatch(changeSelectedGroupCode({ groupCode }));
  }, []);

  //컴포넌트가 처음 렌더링될 때
  useEffect(() => {
    const ignoreVocabIdList = vocabGroupMappingList.map(elem => (
      elem.vocab_id
    ));
    dispatch(getVocabGroupList());
    dispatch(getVocabList({ groupCode: vocabSelectedGroupCode, ignoreVocabIdList:ignoreVocabIdList }));
  }, [dispatch,vocabGroupMappingList]);

  //vocabListReload 가 트루로 변경될 때
  useEffect(() => {
    if (vocabListReload) {
      const ignoreVocabIdList = vocabGroupMappingList.map(elem => (
        elem.vocab_id
      ));
      dispatch(getVocabList({ groupCode: vocabSelectedGroupCode, ignoreVocabIdList:ignoreVocabIdList }));
    }
  }, [vocabListReload]);

  const onChangeGroupCode = useCallback(
    (groupCode) => {
      const findVocabGroupItem = vocabGroupList.find(
        (vocabGroupItem) => vocabGroupItem.group_code === groupCode,
      );
      let groupName = findVocabGroupItem.group_name;
      dispatch(changeGroupCode({ groupCode, groupName }));
    },
    [selectedGroupCode, vocabGroupList],
  );

  useEffect(() => {
    let groupCode = selectedGroupCode;
    dispatch(getVocabGroupMappingList({ groupCode }));
  }, [vocabGroupMappingListReload]);

  const onAddVocabGroupMapping = useCallback(
    (vocabId) => {
      if (selectedGroupCode == null || selectedGroupCode === '') {
        alert('먼저 단어를 등록할 그룹을 선택하세요.');
        return;
      }
      let groupCode = selectedGroupCode;
      dispatch(addVocabGroupMapping({ groupCode, vocabId }));
    },
    [selectedGroupCode],
  );

  const onRemoveVocabGroupMapping = useCallback(
    (vocabId) => {
      let groupCode = selectedGroupCode;
      dispatch(removeVocabGroupMapping({ groupCode, vocabId }));
    },
    [selectedGroupCode],
  );

  return (
    <VocabGroupMappingList
      vocabGroupList={vocabGroupList}
      vocabGroupMappingList={vocabGroupMappingList}
      selectedGroupCode={selectedGroupCode}
      selectedGroupName={selectedGroupName}
      onChangeGroupCode={onChangeGroupCode}
      onAddVocabGroupMapping={onAddVocabGroupMapping}
      onRemoveVocabGroupMapping={onRemoveVocabGroupMapping}
      vocabList={vocabList}
      vocabSelectedGroupCode={vocabSelectedGroupCode}
      onChangeVocabGroupCode={onChangeVocabGroupCode}
    />
  );
};

export default VocabGroupMappingListContainers;
