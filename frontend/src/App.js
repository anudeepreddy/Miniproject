import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Signup from 'pages/Signup';
import Login from 'pages/Login';
import Home from 'pages/Home';
import Workspace from 'pages/Workspace';

function App() {
    return (
        < Router >
        < Switch >
        < Route
    exact
    path = "/"
    component = {Login}
    />
    < Route
    exact
    path = "/signup"
    component = {Signup}
    />
    < Route
    exact
    path = "/login"
    component = {Login}
    />
    < Route
    exact
    path = "/home"
    component = {Home}
    />
    < Route
    exact
    path = "/workspace"
    component = {Workspace}
    />
    < /Switch>
    < /Router>
)
    ;
}

export default App;
