import React, { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Line } from 'react-chartjs-2';
import moment from '../../../node_modules/moment/moment';

const VocabQuestionResultHistoryBlock = styled.div`
  height: calc(100vh - 150px);
  background-color: ${palette.gray[0]};
 
`;

const VocabQuestionResultHistory = ({
  
}) => {
  

  

  return (
    <VocabQuestionResultHistoryBlock>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>학습결과 이력</h4>
          </div>
        </div>
      </div>
    </VocabQuestionResultHistoryBlock>
  );
};

export default VocabQuestionResultHistory;
