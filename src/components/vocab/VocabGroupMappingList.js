import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const VocabGroupMappingListBlock = styled.div`
  overflow: hidden;

  .group_area {
    float: left;
    width: 25%;
    height: 500px;
    overflow-y: auto;
    background-color: ${palette.cyan[0]};
  }
  .group_vocab_area {
    float: left;
    width: 35%;
    height: 500px;
    overflow-y: auto;
    background-color: ${palette.cyan[1]};
  }
  .group_vocab_area .title {
    font-weight: 600;
    margin: 10px 0;
    padding: 5px;
    color: white;
    background: ${palette.gray[6]};
  }
  .arrow_area {
    float: left;
    width: 5%;
    height: 500px;
    background-color: ${palette.cyan[2]};
  }
  .vocab_area {
    float: left;
    width: 35%;
    height: 500px;
    overflow-y: auto;
    background-color: ${palette.cyan[3]};
  }
`;

const GroupListItem = styled.div`
  margin: 10px;
  padding: 5px;
  border: 1px solid ${palette.cyan[4]};
  border-radius: 8px;
  background: ${palette.cyan[4]};
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border: 1px solid ${palette.cyan[6]};
    background: ${palette.cyan[6]};
  }
`;

const GroupVocabListItem = styled.div`
  margin: 10px;
  padding: 5px;
  border: 1px solid #f361a6;
  border-radius: 8px;
  background: #f361a6;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border: 1px solid #d9418c;
    background: #d9418c;
  }
`;

const VocabListItem = styled.div`
  margin: 10px;
  padding: 5px;
  border: 1px solid #a566ff;
  border-radius: 8px;
  background: #a566ff;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border: 1px solid #8041d9;
    background: #8041d9;
  }
`;

const VocabGroupMappingList = ({
  vocabGroupList,
  vocabList,
  vocabGroupMappingList,
  selectedGroupCode,
  selectedGroupName,
  onChangeGroupCode,
  onAddVocabGroupMapping,
  onRemoveVocabGroupMapping,
}) => {
  return (
    <VocabGroupMappingListBlock>
      <div className="group_area">
        {vocabGroupList == null
          ? null
          : vocabGroupList.map((vocabGroupItem) => (
              <GroupListItem
                key={vocabGroupItem.group_code}
                onClick={() => onChangeGroupCode(vocabGroupItem.group_code)}
              >
                {vocabGroupItem.group_name}
              </GroupListItem>
            ))}
      </div>
      <div className="group_vocab_area">
        {selectedGroupCode === '' ? (
          <div className="title">그룹을 선택해 주세요.</div>
        ) : (
          <div className="title">{selectedGroupName}</div>
        )}
        {vocabGroupMappingList == null || vocabGroupMappingList.length === 0 ? (
          <div>단어를 매핑 시켜 주세요.</div>
        ) : (
          vocabGroupMappingList.map((vocabGroupMappingItem) => (
            <GroupVocabListItem
              key={
                vocabGroupMappingItem.group_code +
                '' +
                vocabGroupMappingItem.vocab_id
              }
              onClick={()=>onRemoveVocabGroupMapping(vocabGroupMappingItem.vocab_id)}
            >
              {vocabGroupMappingItem.vocab}({vocabGroupMappingItem.mean})
            </GroupVocabListItem>
          ))
        )}
      </div>
      <div className="arrow_area"></div>
      <div className="vocab_area">
        {vocabList == null
          ? null
          : vocabList.map((vocabItem) => (
              <VocabListItem
                key={vocabItem.id}
                onClick={() => onAddVocabGroupMapping(vocabItem.id)}
              >
                {vocabItem.vocab}({vocabItem.mean})
              </VocabListItem>
            ))}
      </div>
    </VocabGroupMappingListBlock>
  );
};

export default VocabGroupMappingList;
