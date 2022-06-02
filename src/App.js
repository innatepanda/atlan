import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useEffect } from 'react';
import './App.css';

// PAGES =======================================
import Stats from '../src/pages/stats'
import Editor from '../src/pages/editor'
import ErrorPage from '../src/pages/error'

// COMPONENTS ====================================
import Sidebar from '../src/components/sidebar'


function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="main_div">
        <Router >
          <Switch>
            <Route path = "/" exact component={Stats} />
            <Route path = "/stats" exact component={Stats} />
            <Route path = "/editor" exact component={Editor} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
