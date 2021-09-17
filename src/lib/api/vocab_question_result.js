import client from './client';

export const getVocabQuestionResultList = () =>
  client.get(`/vocab/question/result/list`);

export const getVocabQuestionResultGroupList = ({ group_code }) =>
  client.get(`/vocab/question/result/list/${group_code}`);
