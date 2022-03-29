import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useHistory, Route, Switch, Redirect, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainPage from './MainPage';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth.js';
import PageNotFound from './PageNotFound';

function App() {

  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  function handleLogin() {
    setLoggedIn(true)
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');

    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push('/main');
            setEmail(res.data.email);

          }
        })
        .catch(err => {
          setLoggedIn(false);
          console.log(err)
        });
    }
  }

  useEffect(() => {
    tokenCheck()
  }, [tokenCheck]);


  return (

    <div className="App">
      <div className="root">
        <Header
          email={email}
          loggedIn={loggedIn}
        />
        <Switch>
          <ProtectedRoute
            path="/main"
            loggedIn={loggedIn}
            component={MainPage}
          />
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          {/* <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route> */}
          <Route path="*">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
          {/* <Route path="*">
            <PageNotFound />
          </Route> */}
        </Switch>
        <Footer />
      </div>
    </div>

  );
}

export default App;
