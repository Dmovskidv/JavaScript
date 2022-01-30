import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Application from './Main';


const AppRouting = () => (
  <Router>
      <React.Fragment>
        <Routes>
          <Route exact path="/application" element={<Application />} />  
        </Routes>
      </React.Fragment>
    </Router>
);

export default AppRouting;