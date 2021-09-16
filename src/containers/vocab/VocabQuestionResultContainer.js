import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabQuestionResult from '../../components/vocab/VocabQuestionResult';
import { withRouter } from 'react-router-dom';

const VocabQuestionResultContainer = () => {
    return (
        <VocabQuestionResult />
    );
};

export default VocabQuestionResultContainer;