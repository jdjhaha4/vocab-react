import client from './client';

export const getMyShareData = () => client.get(`/share`);

export const getOthersShareData = () => client.get(`/share/others`);

export const getOthersShareOneData = ({ group_code }) =>
  client.get(`/share/others/${group_code}`);

  export const getOthersShareVocabList = ({ group_code }) =>
  client.get(`/share/others/vocab/list/${group_code}`);