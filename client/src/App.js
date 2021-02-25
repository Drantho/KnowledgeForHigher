import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./pages/Home";
import Tag from "./pages/Tag";
import Profile from "./pages/Profile";
import Question from "./pages/Question";
import User from "./pages/User";
import UserHome from './pages/UserHome';
import Ask from './pages/Ask';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NavbarTest from './components/Navbar';
import Browse from './pages/Browse';
import NotFound from './pages/NotFound';
import Service from './pages/Service';
import UserNavbar from './components/UserNavbar/index'
import LoginNavbar from './components/LoginNavbar'
function App() {
  return (
    <Router>
      <UserNavbar/>
      {/* <LoginNavbar/> */}
      <NavbarTest/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/browse">
          <Browse/>
        </Route>
        <Route exact path="/profile">
          <Profile/>
        </Route>
        <Route exact path="/tag/:id">
          <Tag/>
        </Route>
        <Route exact path="/question/:id">
          <Question/>
        </Route>
        <Route exact path="/users/:id">
          <User/>
        </Route>
        <Route exact path="/home">
          <UserHome/>
        </Route>
        <Route exact path="/ask">
          <Ask/>
        </Route>
        <Route path="/service/:id">
          <Service/>
        </Route>
        <Route exact path="/signin">
          <Signin/>          
        </Route>
        <Route exact path="/signup">
          <Signup/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
