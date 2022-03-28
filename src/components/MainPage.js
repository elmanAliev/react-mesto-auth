import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function MainPage() {

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

    // useEffect(() => {
    //     let cleanupFunction = false;
    //     api.getInitialCards()
    //         .then((cardsArray) => {
    //             if(!cleanupFunction) setCards(cardsArray);
    //         })
    //         .catch((err) => {
    //             console.log(`Невозможно отобразить карточки с сервера ${err}`);
    //         });
    //     return () => cleanupFunction = true;    
    // }, [])

    // useEffect(() => {
    //     let cleanupFunction = false;
    //     api.getUserInfo()
    //         .then((userInfoObject) => {
    //             if(!cleanupFunction) setCurrentUser(userInfoObject)
    //         })
    //         .catch((err) => {
    //             console.log(`Невозможно получить информацию о пользователе ${err}`);
    //         });
    //     return () => cleanupFunction = true;
    // }, [])


    useEffect(() => {
        let cleanupFunction = false;
        Promise.all([api.getInitialCards(), api.getUserInfo()])
            .then(([cardsArray, userInfoObject]) => {
                console.log(cardsArray)
                if(!cleanupFunction) {
                    setCurrentUser(userInfoObject)
                    setCards(cardsArray);
                }
                
            })
            .catch((err) => {
                console.log(`Невозможно загрузить информацию с сервера ${err}`);
            });
        return () => cleanupFunction = true;
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

    function handleCardDelete(card) {
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

            <Main
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
            />
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
        </CurrentUserContext.Provider>
    )
}

export default MainPage;
