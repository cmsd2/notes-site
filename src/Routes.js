import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Notes from "./containers/Notes";
import NewNote from "./containers/NewNote";
import SigninCallback from "./containers/SigninCallback";
import SignoutCallback from "./containers/SignoutCallback";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Login from "./containers/Login";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <AuthenticatedRoute path='/notes/new' exact component={NewNote} />
    <AuthenticatedRoute path="/notes/:id" exact component={Notes} />
    <AuthenticatedRoute path='/notes' component={Notes} />
    <Route path='/login' component={Login} />
    <Route path='/signin' component={SigninCallback} />
    <Route path='/signout' component={SignoutCallback} />
    <Route component={NotFound} />
  </Switch>;


