import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import {tempSetUser, check } from './modules/user';
import client from './lib/api/client';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser(){
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if(!token || !user) return; //토큰 없을 경우 아무것도 안함

    store.dispatch(tempSetUser(JSON.parse(user)));
    client.defaults.headers.common['Authorization']=token;
    store.dispatch(check());
  }catch(e){
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
