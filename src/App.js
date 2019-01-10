import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from './Pages/Login';
//import RegisterPage from './Pages/Register';
import { AuthContext } from './Utils/AuthProvider';
import HomePage from './Pages/Home';
import UpcomingPage from './Pages/Upcoming';
import SuggestionsPage from './Pages/Suggestions';

import './css/general.css';

const ProtectedRoute = ({ component: Component, ...rest }) => {

  return <Route {...rest} render={(params) => {
      
      return <AuthContext>

         {( {user}) => {

          return user 
          ? <Component {...params} />
          : <Redirect to="/login" />;
         }}

      </AuthContext>
    }} />
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <Switch>
        <ProtectedRoute path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        {/*<Route path="/register" component={RegisterPage} /> */}
        <ProtectedRoute path="/upcoming" component={UpcomingPage} />
        <ProtectedRoute path="/suggestions" component={SuggestionsPage} />
      </Switch>
    );
  }
}

export default App;
