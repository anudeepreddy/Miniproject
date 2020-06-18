import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from 'pages/Home';
import Editor from 'pages/Editor';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/editor" component={Editor}/>
      </Switch>
    </Router>
  );
}

export default App;
