import client from './client';

export const getVocabQuestionResultHistoryList = ({ vocab_question_result_id }) =>
  client.get(`/vocab/question/result/history/list/${vocab_question_result_id}`);
