import client from './client';

export const getVocabGroupMappingList = ({ groupCode }) =>
  client.get(`/vocab/group/mapping/list?groupCode=${groupCode}`);
export const addVocabGroupMapping = ({ groupCode, vocabId }) =>
  client.post('/vocab/group/mapping/insert', { groupCode, vocabId});
export const removeVocabGroupMapping = ({ groupCode, vocabId  }) =>
  client.post('/vocab/group/mapping/delete', { groupCode, vocabId   });
