import React from 'react';
import VocabStudyType from '../../components/vocab/VocabStudyType';
import { withRouter } from 'react-router-dom';

const VocabStudyTypeContainer = ({ match }) => {
  const { groupcode } = match.params;
  return <VocabStudyType groupcode={groupcode} />;
};

export default withRouter(VocabStudyTypeContainer);
