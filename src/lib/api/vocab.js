import client from './client';

export const getVocabList = ({ groupCode, ignoreVocabIdList }) =>
  client.post(`/vocab/list`,{groupCode,ignoreVocabIdList});
export const addVocab = ({ vocab, mean, selectedGroupCode }) =>
  client.post('/vocab/insert', { vocab, mean, selectedGroupCode });
export const removeVocab = ({ id }) => client.post('/vocab/delete', { id });
