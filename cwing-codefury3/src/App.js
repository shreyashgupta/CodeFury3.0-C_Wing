import './App.css';
import Job from './pages/JobSearch/JobSearch.js'
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.js';
import WorkerSignIn from './pages/WorkerSignIn/WorkerSignIn';
import EmployerSignIn from './pages/EmployerSignIn/EmployerSignIn';
import WorkerSignUp from './pages/WorkerSignUp/WorkerSignUp';
import EmployerSignUp from './pages/EmployerSignUp/EmployerSignUp';
import Navbar from './components/Navbar/Navbar';

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
            <WorkerSignIn />
          </Route>
          <Route path='/JobSearch'>
            <Job/>
          </Route>
          <Route path='/labsignup'>
            <WorkerSignUp/>
          </Route>
          <Route path='/empsignup'>
            <EmployerSignUp/>
          </Route>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
