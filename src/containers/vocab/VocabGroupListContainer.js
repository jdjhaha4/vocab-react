import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupList from '../../components/vocab/GroupList';
import {
  changeField,
  addVocabGroup,
  getVocabGroupList,
  removeVocabGroup,
  updateVocabGroup,
} from '../../modules/vocab_group';

const VocabGroupListContainer = () => {
  const dispatch = useDispatch();

  const { form, vocabGroupList, vocabGroupError, vocabGroupListReload } =
    useSelector(({ vocab_group }) => ({
      form: vocab_group.form,
      vocabGroupList: vocab_group.vocabGroupList,
      vocabGroupError: vocab_group.vocabGroupError,
      vocabGroupListReload: vocab_group.vocabGroupListReload,
    }));

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value,
      }),
    );
  };
  const onFocusComplete = () => {
    dispatch(
      changeField({
        key: 'groupNameFocus',
        value: false,
      }),
    );
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      onAddVocabGroup();
    }
  };

  const onAddVocabGroup = useCallback(() => {
    const { group_name } = form;
    if (group_name.trim() === '') {
      return;
    }
    dispatch(addVocabGroup({ group_name }));
  }, [form]);
  const onRemoveVocabGroup = useCallback((e,group_code) => {
    dispatch(removeVocabGroup({ group_code }));
    e.stopPropagation();
    e.preventDefault();
  }, []);
  const onUpdateVocabGroup = useCallback((groupItem) => {
    dispatch(
      updateVocabGroup({
        group_code: groupItem.group_code,
        group_name: groupItem.group_name,
        release_boolean: groupItem.release_boolean,
      }),
    );
  }, []);
  //컴포넌트가 처음 렌더링될 때
  useEffect(() => {
    dispatch(getVocabGroupList());
  }, [dispatch]);
  //vocabGroupListReload 가 트루로 변경될 때
  useEffect(() => {
    if (vocabGroupListReload) {
      dispatch(getVocabGroupList());
    }
  }, [vocabGroupListReload]);

  return (
    <GroupList
      form={form}
      vocabGroupList={vocabGroupList}
      vocabGroupError={vocabGroupError}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onAddVocabGroup={onAddVocabGroup}
      getVocabGroupList={getVocabGroupList}
      onFocusComplete={onFocusComplete}
      onRemoveVocabGroup={onRemoveVocabGroup}
      onUpdateVocabGroup={onUpdateVocabGroup}
    />
  );
};

export default VocabGroupListContainer;
