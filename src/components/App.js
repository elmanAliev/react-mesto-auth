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

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((cardsArray) => {
        setCards(cardsArray);
      })
      .catch((err) => {
          console.log(`Невозможно отобразить карточки с сервера ${err}`);
      })
  }, [])

  useEffect(() => {
    api.getUserInfo()
      .then((userInfoObject) => {
        setCurrentUser(userInfoObject)
      })
      .catch((err) => {
        console.log(`Невозможно получить информацию о пользователе ${err}`);
      });
  }, [])

  function handleUpdateUser(data) {
    api.patchUserInfo(data)
      .then((userInfoObject) => {
        setCurrentUser(userInfoObject)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Невозможно загрузить данные на сервер ${err}`);
      })
  }

  function handleUpdateAvatar(data) {
    api.patchAvatar(data.avatar)
      .then((userInfoObject) => {
        setCurrentUser(userInfoObject)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Невозможно загрузить данные на сервер ${err}`);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    isLiked 
      ? api.deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      : api.putLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
  } 

  function handleCardDelete (card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Невозможно удалить карточку: ${err}`);
      })
  }

  function handleAddPlace(card) {
    api.postNewCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Невозможно добавить карточку: ${err}`);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="root">
          <Header />
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
          />
          <Footer />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <PopupWithForm
            onClose={closeAllPopups}
            name="confirm"
            title="Вы уверены"
            children={<></>}
          />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
