import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const VocabListBlock = styled.div`
  
`;

const VocabList = () => {
  return (
    <VocabListBlock>
      <div className="add">
        <label>단어 등록:</label>
        <input type="text" placeholder="영어 단어" />
        <input type="text" placeholder="한글 뜻" />
        <Button onClick={()=>{alert('test')}}>+</Button>
      </div>
      <div>
        
      </div>
    </VocabListBlock>
  );
};

export default VocabList;
