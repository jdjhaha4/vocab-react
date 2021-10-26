import client from './client';

export const getVocabAttentionList = () => client.post(`/vocab/attention/list`);
