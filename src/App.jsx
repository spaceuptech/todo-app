import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import history from './history';
import './App.css'

import LoginComponent from './components/LoginComponent'
import SignUpComponent from './components/SignUpComponent'
import TodoApp from './components/TodoApp'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={LoginComponent}></Route>
          <Route exact path="/signup" component={SignUpComponent}></Route>
          <Route exact path="/home" component={TodoApp}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
