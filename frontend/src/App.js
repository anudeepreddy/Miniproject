import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "pages/Signup";
import Login from "pages/Login";
import Home from "pages/Home";
import Workspace from "pages/Workspace";
import SocketContext from './components/SocketContext';
import * as io from 'socket.io-client'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function AuthRoutes({match}){
  const token = localStorage.getItem('token');
  const socket = io('',{
    extraHeaders: {
      'x-auth-token': token
    },
    transportOptions: {
      polling: {
        extraHeaders: {
          'x-auth-token': token
        }
      }
    },
  });

  return (
      <SocketContext.Provider value={socket}>
        <Route exact path={`${match.url}/home`} component={Home}/>
        <Route exact path={`${match.url}/workspace/:id`} component={Workspace} />
      </SocketContext.Provider>
  )
}

function App() {
  return (  
    <Router>
      <Switch>
        <Route path="/a" component={AuthRoutes}/>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/home" component={Home} />
        <Route exact path="/workspace/:id" component={Workspace} /> */}
      </Switch>
    </Router>
  );
}

export default App;
