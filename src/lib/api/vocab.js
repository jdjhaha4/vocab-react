import client from './client';

export const getVocabList = () => client.get('/vocab/list');
export const addVocab = ({ vocab, mean }) =>
  client.post('/vocab/insert', { vocab, mean });
