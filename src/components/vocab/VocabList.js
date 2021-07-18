import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const VocabListBlock = styled.div``;

const VocabList = ({ form, vocabList, vocabError, onChange, onAddVocab }) => {
  return (
    <VocabListBlock>
      <div className="add">
        <label>단어 등록:</label>
        <input
          name="vocab"
          type="text"
          placeholder="영어 단어"
          value={form.vocab}
          onChange={onChange}
        />
        <input
          name="mean"
          type="text"
          placeholder="한글 뜻"
          value={form.mean}
          onChange={onChange}
        />
        <Button
          onClick={onAddVocab}
        >
          +
        </Button>
      </div>
      <div></div>
    </VocabListBlock>
  );
};

export default VocabList;
