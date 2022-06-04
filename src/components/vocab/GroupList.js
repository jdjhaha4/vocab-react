import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import GroupModifyAlertModal from './GroupModifyAlertModal';

const GroupListBlock = styled.div`
  background-color: ${palette.gray[0]};
  .group_list {
    height: calc(100vh - 270px);
    overflow: auto;
  }
  .add {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    gap: 0.3em;
  }

  label {
    display: block;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 5px;
  }
`;

const StyledInput = styled.input`
  margin: 10px 0;
  margin-left: 5px;
  display: block;
  width: 100%;
  ${(props) =>
    props.groupNm &&
    css`
      flex-grow: 1;
      float: left;
      width: 90%;
    `};
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6e707e;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    color: #6e707e;
    background-color: #fff;
    border-color: #bac8f3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(78 115 223 / 25%);
  }
  & + & {
    margin-left: 10px;
  }
`;
const StyledButton = styled(Button)`
  float: right;
  height: 38px;
  margin-top: 10px;
  margin-right: 15px;
`;

const GroupListItem = styled.div`
  background-color: white;
  box-shadow: 0px 4px 20px rgba(204, 204, 204, 0.3);
  border-radius: 10px;
  margin: 10px;
  border: 1px solid ${palette.gray[1]};
  padding: 0.7rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  gap: 0.3em;

  &:hover {
    cursor: pointer;
    background: ${palette.gray[2]};
  }

  .groupNm {
    float: left;
    display: block;
    width: 80%;
  }
`;
const StyledButton2 = styled(Button)`
  float: right;
  height: 30px;
`;
const GroupList = ({
  form,
  vocabGroupList,
  onChange,
  onKeyUp,
  onAddVocabGroup,
  getVocabGroupList,
  onFocusComplete,
  onRemoveVocabGroup,
  onUpdateVocabGroup,
}) => {
  const groupNameInputEl = useRef(null);
  const groupNameInputElFocus = () => {
    groupNameInputEl.current.focus();
  };
  const [modifyFlag, setModifyFlag] = useState({
    visible: false,
  });
  //vocabFocus 가 트루로 변경될 때
  useEffect(() => {
    if (form.groupNameFocus) {
      groupNameInputElFocus();
      onFocusComplete();
    }
  }, [form.groupNameFocus]);

  const onCancelGroupModify = useCallback(() => {
    setModifyFlag({
      visible: false,
      title: '그룹 수정',
      group_code: '',
      group_name: '',
      release_boolean:false,
    });
  }, []);

  const onSaveGroupItem = useCallback(({ group_code, group_name, release_boolean }) => {
    onUpdateVocabGroup({ group_code: group_code, group_name: group_name, release_boolean: release_boolean });
    setModifyFlag({
      visible: false,
      title: '그룹 수정',
      group_code: '',
      group_name: '',
      release_boolean: false,
    });
  }, []);

  const onGroupItemClick = useCallback((groupItem) => {
    setModifyFlag({
      visible: true,
      title: '그룹 수정',
      group_code: groupItem.group_code,
      group_name: groupItem.group_name,
      release_boolean: groupItem.release_boolean,
    });
  }, []);

  return (
    <GroupListBlock>
      <label>그룹 등록</label>
      <div className="add">
        <StyledInput
          ref={groupNameInputEl}
          groupNm="true"
          name="group_name"
          type="text"
          placeholder="그룹 명"
          value={form.group_name}
          onChange={onChange}
          onKeyUp={onKeyUp}
          autoComplete="off"
        />
        <StyledButton onClick={onAddVocabGroup}>+</StyledButton>
      </div>
      <div className="group_list">
        {vocabGroupList.map((vocabGroupItem) => (
          <GroupListItem
            key={vocabGroupItem.group_code}
            onClick={(e) => onGroupItemClick(vocabGroupItem)}
          >
            <span className="groupNm">
              {vocabGroupItem.group_name} ({vocabGroupItem.vocab_count} 단어)
            </span>
            <StyledButton2
              onClick={(e) => onRemoveVocabGroup(e, vocabGroupItem.group_code)}
            >
              -
            </StyledButton2>
          </GroupListItem>
        ))}
      </div>
      <GroupModifyAlertModal
        title={modifyFlag.title}
        visible={modifyFlag.visible}
        groupCode={modifyFlag.group_code}
        groupName={modifyFlag.group_name}
        release_boolean={modifyFlag.release_boolean}
        onCancel={onCancelGroupModify}
        onSaveGroupItem={onSaveGroupItem}
      />
    </GroupListBlock>
  );
};

export default GroupList;
