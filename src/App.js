import React from 'react';
import './assets/css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import Auth from './Auth';

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/signin" component={ SignIn } />
          <Route exact path="/signup" component={ SignUp } />
          <Auth>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route exact path="/profile" component={ Profile } />
              <Route render={ () => <p>Not Found</p> } />
            </Switch>
          </Auth>
        </Switch>
      </Router>
    </div>
  );
}

export default App;