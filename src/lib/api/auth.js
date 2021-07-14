import client from "./client";

//로그인
export const login = ({id, password}) =>
   client.post('/api/auth/login',{id, password});

export const register = ({id, password}) =>
  client.post('/api/auth/register', {id, password});

export const check = ()=> client.get('/api/auth/check');

//로그아웃
export const logout = () => client.post('/api/auth/logout');