import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
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
              <Route path='/profiles' component={Profiles} exact />
              <Route path='/profile/:id' component={Profile} exact />
              <PrivateRoute path='/dashboard' component={Dashboard} exact />
              <PrivateRoute path='/posts' component={Posts} exact />
              <PrivateRoute
                path='/create-profile'
                component={CreateProfile}
                exact
              />
              <PrivateRoute
                path='/edit-profile'
                component={EditProfile}
                exact
              />
              <PrivateRoute
                path='/add-experience'
                component={AddExperience}
                exact
              />
              <PrivateRoute
                path='/add-education'
                component={AddEducation}
                exact
              />
            </Switch>
          </section>
        </>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
