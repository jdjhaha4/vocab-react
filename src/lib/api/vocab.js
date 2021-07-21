import client from './client';

export const getVocabList = ({ groupCode }) =>
  client.get(`/vocab/list?groupCode=${groupCode}`);
export const addVocab = ({ vocab, mean }) =>
  client.post('/vocab/insert', { vocab, mean });
export const removeVocab = ({ id }) => client.post('/vocab/delete', { id });
