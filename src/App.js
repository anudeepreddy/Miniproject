import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from 'pages/Home';
import Workspace from 'pages/Workspace';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/workspace" component={Workspace}/>
      </Switch>
    </Router>
  );
}

export default App;
