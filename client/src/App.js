import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/layout/auth/Register";
import Login from "./components/layout/auth/Login";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Route path='/' component={Landing} exact />
    <section className='container'>
      <Switch>
        <Route path='/register' component={Register} exact />
        <Route path='/login' component={Login} exact />
      </Switch>
    </section>
  </BrowserRouter>
);
export default App;
