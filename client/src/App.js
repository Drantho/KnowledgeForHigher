import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import API from "./utils/API";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const [formObj, setFormObj] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const [userState, setUserState] = useState({
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    isSignedIn: false,
    token: ""
  });

  const handleInputChanged = event => {
    const { name, value } = event.target;
    setFormObj({ ...formObj, [name]: value })
  }

  const handleSignUpSubmit = event => {
    event.preventDefault();

    API.signUp(formObj).then(response => {
      console.log(response);
      setUserState({
        id: response.data.id,
        userName: response.data.user.userName,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        isSignedIn: true,
        token: response.data.token
      });
      localStorage.setItem("token", response.data.token);
    }).catch(err => {
      console.log(err);
      localStorage.clear("token")
    });
  }

  const handleSignInSubmit = event => {
    event.preventDefault();

    API.signIn(formObj).then(response => {
      console.log(response);
      setUserState({
        id: response.data.id,
        userName: response.data.user.userName,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        isSignedIn: true,
        token: response.data.token
      });
      localStorage.setItem("token", response.data.token);
    }).catch(err => {
      console.log(err);
      localStorage.clear("token")
    });
  }

  useEffect(()=> {
    console.log(`useEffect() fires`);
    const token = localStorage.getItem("token");
    if(token){
      console.log(`token found`);
      API.authenticate(token).then(response => {
        console.log(`response received`);
        console.log(response);
        setUserState({
          id: response.data.user.id,
          userName: response.data.user.userName,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          isSignedIn: true,
          token: response.data.token
        });
      }).catch(err => {
        console.log(err);
        // localStorage.clear("token")
      });
    }
    
  }, [])

  return (
    <Router>
      <UserNavbar />
      {/* <LoginNavbar/> */}
      <NavbarTest />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/browse">
          <Browse />
        </Route>
        <ProtectedRoute exact path="/profile" isSignedIn={userState.isSignedIn}>
          <Profile userState={userState}/>
        </ProtectedRoute>
        <Route exact path="/tag/:id">
          <Tag />
        </Route>
        <Route exact path="/question/:id">
          <Question />
        </Route>
        <Route exact path="/users/:id">
          <User />
        </Route>
        <Route exact path="/home">
          <UserHome />
        </Route>
        <Route exact path="/ask">
          <Ask userState={userState}/>
        </Route>
        <Route path="/service/:id">
          <Service />
        </Route>
        <Route exact path="/signin">
          <Signin
            handleInputChanged={handleInputChanged} 
            handleSubmit={handleSignInSubmit} 
            formObj={formObj} 
            setFormObj={setFormObj} 
            userState={userState} 
            setUserState={setUserState}  />
        </Route>
        <Route exact path="/signup">
          <Signup 
            handleInputChanged={handleInputChanged} 
            handleSubmit={handleSignUpSubmit} 
            formObj={formObj} 
            setFormObj={setFormObj} 
            userState={userState} 
            setUserState={setUserState} 
          />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
