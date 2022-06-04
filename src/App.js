import React from "react";
import {Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import VocabStudyPage from "./pages/VocabStudyPage";
import ShareStudyPage from "./pages/ShareStudyPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import VocabStudyPageBackgroundContainer from "./containers/vocab/VocabStudyPageBackgroundContainer";
import AppBackgroundContainer from "./containers/AppBackgroundContainer";

function App() {
  return (
    <>
      <Route component={MainPage} path={['/@:username','/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register"/>
      <Route component={VocabStudyPage} path="/vocab"/>
      <Route component={ShareStudyPage} path="/share"/>
      <VocabStudyPageBackgroundContainer />
      <AppBackgroundContainer />
    </>
  );
}

export default App;
