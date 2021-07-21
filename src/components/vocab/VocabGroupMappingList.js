import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const VocabGroupMappingListBlock = styled.div`
  background-color: ${palette.cyan[0]};
  overflow: hidden;

  .group_area {
    float: left;
    width: 25%;
    height: 500px;
    overflow-y: scroll;
  }
  .group_vocab_area {
    float: left;
    width: 35%;
    height: 500px;
    overflow-y: scroll;
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
  }
  .vocab_area {
    float: left;
    width: 35%;
    height: 500px;
    overflow-y: scroll;
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
  border: 1px solid #A566FF;
  border-radius: 8px;
  background: #A566FF;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border: 1px solid #8041D9;
    background: #8041D9;
  }
`;

const VocabGroupMappingList = () => {
  return (
    <VocabGroupMappingListBlock>
      <div className="group_area">
        <GroupListItem>DAY 01</GroupListItem>
        <GroupListItem>DAY 02</GroupListItem>
        <GroupListItem>DAY 03</GroupListItem>
        <GroupListItem>DAY 04</GroupListItem>
        <GroupListItem>DAY 05</GroupListItem>
      </div>
      <div className="group_vocab_area">
        <div className="title">DAY 01</div>
        <GroupVocabListItem>hold</GroupVocabListItem>
        <GroupVocabListItem>create</GroupVocabListItem>
        <GroupVocabListItem>enhance</GroupVocabListItem>
        <GroupVocabListItem>develop</GroupVocabListItem>
      </div>
      <div className="arrow_area"></div>
      <div className="vocab_area">
        <VocabListItem>hold</VocabListItem>
        <VocabListItem>create</VocabListItem>
        <VocabListItem>enhance</VocabListItem>
        <VocabListItem>develop</VocabListItem>
        <VocabListItem>hold</VocabListItem>
        <VocabListItem>create</VocabListItem>
        <VocabListItem>enhance</VocabListItem>
        <VocabListItem>develop</VocabListItem>
        <VocabListItem>hold</VocabListItem>
        <VocabListItem>create</VocabListItem>
        <VocabListItem>enhance</VocabListItem>
        <VocabListItem>develop</VocabListItem>
        <VocabListItem>hold</VocabListItem>
        <VocabListItem>create</VocabListItem>
        <VocabListItem>enhance</VocabListItem>
        <VocabListItem>develop</VocabListItem>
      </div>
    </VocabGroupMappingListBlock>
  );
};

export default VocabGroupMappingList;
