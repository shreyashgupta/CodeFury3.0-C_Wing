import './App.css';
import Job from './pages/JobSearch/JobSearch.js'
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
// import Chat from './pages/chatbox/Chat';
import LandingPage from './pages/LandingPage/LandingPage.js';
import WorkerSignIn from './pages/WorkerSignIn/WorkerSignIn';
import EmployerSignIn from './pages/EmployerSignIn/EmployerSignIn';
import WorkerSignUp from './pages/WorkerSignUp/WorkerSignUp';
import EmployerSignUp from './pages/EmployerSignUp/EmployerSignUp';
import AddJob from './pages/AddJob/AddJob';
import Navbar from './components/Navbar/Navbar';
// import Map from './components/Map.js';

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
          <Route path='/worksignin'>
            <WorkerSignIn />
          </Route>
          <Route path='/JobSearch'>
            <Job/>
          </Route>
          <Route path='/worksignup'>
            <WorkerSignUp/>
          </Route>
          <Route path='/empsignup'>
            <EmployerSignUp/>
          </Route>
          {/* <Route path='/map'>
            <Map/>
          </Route> */}
          {/* <Route path='/chat'>
            <Chat/>
          </Route> */}
          <Route path='/addjob'>
            <AddJob/>
          </Route>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
