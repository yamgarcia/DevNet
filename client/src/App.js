import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Routes from "./components/routing/Routes";

import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

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
          <Switch>
            <Route path='/' component={Landing} exact />
            <Route component={Routes} />
          </Switch>
        </>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
