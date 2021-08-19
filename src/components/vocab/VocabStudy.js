import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';


const VocabStudyBlock = styled.div`
  height: calc(100vh - 150px);
  background-color: ${palette.gray[0]};
`;
const VocabStudy = () => {
  return <VocabStudyBlock>학습하기</VocabStudyBlock>;
};

export default VocabStudy;
