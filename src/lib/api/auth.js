import client from "./client";

//로그인
export const login = ({id, password}) =>
   client.post('/api/auth/login',{id, password});

export const register = ({id, nickname, password}) =>
  client.post('/api/auth/register', {id, nickname, password});

export const idDuplCheck = ({id}) => client.post('/api/auth/idDupleCheck',{id});

export const check = ()=> client.get('/api/auth/check');

//로그아웃
export const logout = () => client.post('/api/auth/logout');