import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={card ? 'popup_opened popup popup_image' : 'popup popup_image'}>
            <div onClick={onClose} className="popup__overlay"></div>
            <div className="popup__wrapper">
                <button onClick={onClose} className="popup__button popup__button_type_close close" type="button"></button>
                <img src={card ? card.link : ''} alt={card ? card.name : ''} className="popup__img" />
                <p className="popup__img-text">{card ? card.name : ''}</p>
            </div>
        </div>
    )
}

export default ImagePopup;