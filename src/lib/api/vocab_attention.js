import client from './client';

export const getVocabAttentionList = () => client.post(`/vocab/attention/list`);
export const getVocabAttentionDetail = ({ vocab_id }) =>
  client.get(`/vocab/attention/detail/${vocab_id}`);
