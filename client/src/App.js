import  { React, useState, useEffect } from 'react';
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
import MessageView from './pages/MessageView';
import UserNavbar from './components/UserNavbar/index';
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

  const handleSignUpSubmit = cb => {

    API.signUp(formObj).then(response => {
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
      cb();    
    }).catch(err => {
      console.log(err);
      localStorage.clear("token")
    });
  }

  const handleSignInSubmit = cb => {    

    API.signIn(formObj).then(response => {
      setUserState({
        id: response.data.user.id,
        userName: response.data.user.userName,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        isSignedIn: true,
        token: response.data.token
      });
      localStorage.setItem("token", response.data.token);
      cb();
    }).catch(err => {
      console.log(err);
      localStorage.clear("token")
    });
  }

  useEffect(()=> {
    const token = localStorage.getItem("token");
    if(token){
      API.authenticate(token).then(response => {
        setUserState({
          id: response.data.user.id,
          userName: response.data.user.userName,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          isSignedIn: true,
          token: response.data.token
        });
        console.log(userState.id);
      }).catch(err => {
        console.log(err);
        localStorage.clear("token")
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
          <Browse userState={userState}/>
        </Route>
        <ProtectedRoute exact path="/profile" isSignedIn={userState.isSignedIn}>
          <Profile userState={userState}/>
        </ProtectedRoute>
        <Route exact path="/tag/:id">
          <Tag />
        </Route>
        <Route exact path="/question/:id">
          <Question userState={userState}/>
        </Route>
        <Route exact path="/users/:id">
          <User />
        </Route>
        <ProtectedRoute exact path="/home" isSignedIn={userState.isSignedIn}>
          <UserHome userState={userState}/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/ask" isSignedIn={userState.isSignedIn}>
          <Ask userState={userState}/>
        </ProtectedRoute>
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
        <ProtectedRoute exact path="/messages" isSignedIn={userState.isSignedIn}>
          <MessageView userState={userState} />
        </ProtectedRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
