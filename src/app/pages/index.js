import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './home/Home';

export default function index() {
  return (
    <Switch>
      {
        <Redirect exact from="/" to="/home" />
      }
      <Route path="/home" component={Home} />
    </Switch>
  )
}

