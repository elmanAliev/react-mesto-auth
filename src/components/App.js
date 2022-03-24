import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { useHistory, Route, Switch, Redirect, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainPage from './MainPage';
import Login from './Login';
import Register from './Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  

  return (
    
      <div className="App">
        <div className="root">
        <Header />
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
              <Login />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-up" />}
            </Route>




          </Switch>
          <Footer />

        </div>
      </div>
    
  );
}

export default App;
