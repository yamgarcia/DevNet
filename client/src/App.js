import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";

//redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <Route path='/' component={Landing} exact />
      <section className='container'>
        <Alert />
        <Switch>
          <Route path='/register' component={Register} exact />
          <Route path='/login' component={Login} exact />
        </Switch>
      </section>
    </BrowserRouter>
  </Provider>
);
export default App;
