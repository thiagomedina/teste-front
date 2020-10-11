import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/Signin';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import FormUser from  '../pages/Dashboard/FormUser'



const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signin" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path= "/dashboard/form-user" exact component={FormUser} isPrivate />
    <Route path= "/dashboard/form-user/:id" exact component={FormUser} isPrivate />


  </Switch>
);

export default Routes;
