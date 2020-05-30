import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

//redux
import { Provider } from "react-redux";
import store from "./store";

const { token } = localStorage;
if (token) {
  setAuthToken(token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <NavBar />
          <Route path='/' component={Landing} exact />
          <section className='container'>
            <Alert />
            <Switch>
              <Route path='/register' component={Register} exact />
              <Route path='/login' component={Login} exact />
              <PrivateRoute path='/dashboard' component={Dashboard} exact />
            </Switch>
          </section>
        </>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
