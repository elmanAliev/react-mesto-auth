import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({onCardClick, onCardLike, onCardDelete, card}) {

    const userInfo = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === userInfo._id;
    const cardDeleteButtonClassName = isOwn ? 'element__trash' : 'element__trash element__trash_hide';
    const isLiked = card.likes.some(i => i._id === userInfo._id);
    const cardLikeButtonClassName = isLiked ? 'element__like  element__like_active' : 'element__like';
    

    function handleClick() {
        onCardClick(card);
    }

    function handleLike() {
        onCardLike(card);
    }

    function handleDelete() {
        onCardDelete(card);
    }

    return (
        <>
            <div className="element">
                <button onClick={handleDelete} className={cardDeleteButtonClassName} type="button"></button>
                <img onClick={handleClick} src={card.link} alt={card.name} className="element__image" />
                <div className="element__info">
                    <h2 className="element__name">{card.name}</h2>
                    <div className="element__wrapper">
                        <button onClick={handleLike} className={cardLikeButtonClassName} type="button"></button>
                        <span className="element__likes-number">{card.likes.length}</span>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Card;