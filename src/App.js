import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
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
  <Router >
    <div className="App">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main_div">
            <Routes>
              <Route path = "/"  element={<Stats/>} />
              <Route path = "/stats"  element={<Stats/>} />
              <Route path = "/editor"  element={<Editor/>} />
              <Route path="*" element={<ErrorPage/>} />
            </Routes>
        </div>
    </div>
  </Router>
    
  );
}

export default App;
