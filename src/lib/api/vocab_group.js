import client from './client';

export const getVocabGroupList = () => client.get(`/vocab/group/list`);
export const getVocabGroupData = ({ group_code }) => client.get(`/vocab/group/${group_code}`);
export const addVocabGroup = ({ group_name }) =>
  client.post('/vocab/group/insert', { group_name });
export const removeVocabGroup = ({ group_code }) =>
  client.post('/vocab/group/delete', { group_code });
