/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginContext } from 'contexts'
import { Login, Register, Home} from 'views'
import { Layout } from '../layout';
import { Users } from 'views/dependants/Users/Users';
import { Money } from 'views/dependants/Money/Money';
import { Transactions } from 'views/dependants/Transactions/Transactions';

export const AppRoutes = () => {
  const { loginStatus } = useContext(LoginContext);
  const [redirectToLogin, setRedirectToLogin] = useState(true);
  useEffect(() => {
    if (loginStatus)
      setRedirectToLogin(false);
    else
      setRedirectToLogin(true);
  }, [loginStatus])
  return (
    <Switch>
      <Route exact path='/' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }} /> : <Redirect to={{ pathname: '/home' }} />))} />
      <Route exact path='/login' render={() => ((!redirectToLogin ? <Redirect to={{ pathname: '/home' }} /> : <Login />))} />
      <Route exact path='/register' render={() => ((!redirectToLogin ? <Redirect to={{ pathname: '/home' }} /> : <Register />))} />
      <Layout>
        <Route exact path='/home' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }} /> : <Home />))} />
        <Route exact path='/money' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }} /> : <Money />))} />
        <Route exact path='/users' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }} /> : <Users />))} />
        <Route exact path='/transactions' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }} /> : <Transactions />))} />
   </Layout>
    </Switch>
  )
};
