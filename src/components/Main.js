import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({cards, onCardLike, onCardDelete, onCardClick, onEditProfile, onAddPlace, onEditAvatar }) {

  const userInfo = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img onClick={onEditAvatar} src={userInfo.avatar} alt="Фото пользователя" className="profile__image" />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button onClick={onEditProfile} className="profile__button profile__button_type_edit" type="button"></button>
          </div>
          <p className="profile__job">{userInfo.about}</p>
        </div>
        <button onClick={onAddPlace} className="profile__button profile__button_type_add" type="button"></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return <Card
              onCardClick = {onCardClick}
              onCardLike = {onCardLike}
              onCardDelete = {onCardDelete}
              card = {card}
              key = {card._id}
          />
        })}
      </section>
    </main>
  )
}

export default Main;