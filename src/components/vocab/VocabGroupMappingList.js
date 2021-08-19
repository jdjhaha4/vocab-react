import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const VocabGroupMappingListBlock = styled.div`
  overflow: hidden;

  .group_area {
    float: left;
    width: 25%;
    height: calc(100vh - 200px);
    overflow-y: auto;
    background-color: ${palette.gray[3]};
  }
  .group_vocab_area {
    float: left;
    width: 35%;
    height: calc(100vh - 200px);
    overflow-y: auto;
    background-color: ${palette.gray[3]};
  }
  .group_vocab_area .title {
    font-weight: 600;
    margin: 10px 0;
    padding: 5px;
    color: white;
    background: ${palette.cyan[4]};
  }
  .arrow_area {
    float: left;
    width: 5%;
    height: calc(100vh - 200px);
    background-color: ${palette.gray[3]};
  }
  .vocab_area {
    float: left;
    width: 35%;
    height: calc(100vh - 200px);
    overflow-y: auto;
    background-color: ${palette.gray[3]};
  }

  .group_select_area {
    padding: 5px;
    width: 100%;

    select {
      width: 100%;
      border: none;
      padding: 10px;
      border-radius: 5px;

      option {
        margin: 3px 0;
        border: none;
      }
      option:focus {
        border: none;
      }
    }

    select:focus {
      border: none;
      outline: none;
    }
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
  background-color: white;
  box-shadow: 0px 4px 20px rgba(204, 204, 204, 0.3);
  border-radius: 10px;
  margin: 10px;
  border: 1px solid ${palette.gray[1]};
  padding: 0.7rem;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    border: 1px solid ${palette.gray[4]};
    background: ${palette.gray[4]};
  }

  .vocab {
    color: #003399;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const VocabListItem = styled.div`
  background-color: white;
  box-shadow: 0px 4px 20px rgba(204, 204, 204, 0.3);
  border-radius: 10px;
  margin: 10px;
  border: 1px solid ${palette.gray[1]};
  padding: 0.7rem;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    border: 1px solid ${palette.gray[4]};
    background: ${palette.gray[4]};
  }

  .vocab {
    color: #003399;
    font-size: 1.2rem;
    font-weight: 600;
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
  vocabSelectedGroupCode,
  onChangeVocabGroupCode,
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
              onClick={() =>
                onRemoveVocabGroupMapping(vocabGroupMappingItem.vocab_id)
              }
            >
              <span className="vocab">{vocabGroupMappingItem.vocab}</span>(
              {vocabGroupMappingItem.mean})
            </GroupVocabListItem>
          ))
        )}
      </div>
      <div className="arrow_area"></div>
      <div className="vocab_area">
        <div className="group_select_area">
          <select
            value={vocabSelectedGroupCode}
            onChange={(e) => {
              onChangeVocabGroupCode(e.target.value);
            }}
          >
            <option value="all">모든 단어</option>
            <option value="none">그룹이 없는 단어</option>
            {vocabGroupList == null
              ? null
              : vocabGroupList.map((vocabGroupItem) => (
                  <option
                    key={vocabGroupItem.group_code}
                    value={vocabGroupItem.group_code}
                  >
                    {vocabGroupItem.group_name}
                  </option>
                ))}
          </select>
        </div>
        {vocabList == null
          ? null
          : vocabList.map((vocabItem) => (
              <VocabListItem
                key={vocabItem.id}
                onClick={() => onAddVocabGroupMapping(vocabItem.id)}
              >
                <span className="vocab">{vocabItem.vocab}</span>({vocabItem.mean})
              </VocabListItem>
            ))}
      </div>
    </VocabGroupMappingListBlock>
  );
};

export default VocabGroupMappingList;
