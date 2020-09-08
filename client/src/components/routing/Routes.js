import React from "react";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-form/CreateProfile";
import EditProfile from "../profile-form/EditProfile";
import AddExperience from "../profile-form/AddExperience";
import AddEducation from "../profile-form/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";
import { Route, Switch } from "react-router-dom";

export const Routes = () => {
  return (
    <>
      <section className='container'>
        <Alert />
        <Switch>
          <Route path='/register' component={Register} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/profiles' component={Profiles} exact />
          <Route path='/profile/:id' component={Profile} exact />
          <PrivateRoute path='/dashboard' component={Dashboard} exact />
          <PrivateRoute path='/posts' component={Posts} exact />
          <PrivateRoute path='/posts/:id' component={Post} exact />
          <PrivateRoute
            path='/create-profile'
            component={CreateProfile}
            exact
          />
          <PrivateRoute path='/edit-profile' component={EditProfile} exact />
          <PrivateRoute
            path='/add-experience'
            component={AddExperience}
            exact
          />
          <PrivateRoute path='/add-education' component={AddEducation} exact />
          <Route component={NotFound} />
        </Switch>
      </section>
    </>
  );
};

export default Routes;
