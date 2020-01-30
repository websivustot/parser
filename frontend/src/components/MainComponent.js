import React from 'react';
import Card from './Card';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';



class Main extends React.Component {
  
  render() {
    let dictionary = [
      {'eng':'good morning', 'rus':'доброе утро', 'ita':'buongiorno', 'fin':'huomenta'}
    ]
    
    return (
      <>
        <Header />
        <Switch>
          <Route path="/card" component={() => <Card dict={dictionary}/>} />
          <Route path="/login" component={() => <Login />} />
          <Route path="/signup" component={() => <Signup />} />
          <Redirect to="/card" />
        </Switch>
      </>
    );
  }
}

export default withRouter(Main);
