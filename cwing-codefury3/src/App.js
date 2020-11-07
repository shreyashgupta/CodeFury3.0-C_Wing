import './App.css';
import Job from './pages/JobSearch/JobSearch.js'
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import LabourerSignIn from './pages/LabourerSignIn';
import EmployerSignIn from './pages/EmployerSignIn';
import LabourerSignUp from './pages/LabourerSignUp';
import EmployerSignUp from './pages/EmployerSignUp'
import Chat from './pages/chatbox/Chat';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="App">
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/empsignin'>
            <EmployerSignIn />
          </Route>
          <Route path='/labsignin'>
            <LabourerSignIn />
          </Route>
          <Route path='/JobSearch'>
            <Job/>
          </Route>
          <Route path='/labsignup'>
            <LabourerSignUp/>
          </Route>
          <Route path='/empsignup'>
            <EmployerSignUp/>
          </Route>
          <Route path='/chat'>
            <Chat/>
          </Route>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
