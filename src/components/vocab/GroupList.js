import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const GroupListBlock = styled.div`
  background-color: ${palette.gray[0]};

  .add {
    overflow: hidden;
  }

  label {
    padding: 10px;
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
  margin-right: 10px;
`;

const GroupListItem = styled.div`
  background-color: white;
  box-shadow: 0px 4px 20px rgba(204, 204, 204, 0.3);
  border-radius: 10px;
  margin: 10px;
  border: 1px solid ${palette.gray[1]};
  padding: 0.7rem;
  overflow: hidden;

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
}) => {
  const groupNameInputEl = useRef(null);
  const groupNameInputElFocus = () => {
    groupNameInputEl.current.focus();
  };
  //vocabFocus 가 트루로 변경될 때
  useEffect(() => {
    if (form.groupNameFocus) {
      groupNameInputElFocus();
      onFocusComplete();
    }
  }, [form.groupNameFocus]);

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
      <div>
        {vocabGroupList.map((vocabGroupItem) => (
          <GroupListItem key={vocabGroupItem.group_code}>
            <span className="groupNm">{vocabGroupItem.group_name}</span>
            <StyledButton2
              onClick={() => onRemoveVocabGroup(vocabGroupItem.group_code)}
            >
              -
            </StyledButton2>
          </GroupListItem>
        ))}
      </div>
    </GroupListBlock>
  );
};

export default GroupList;
