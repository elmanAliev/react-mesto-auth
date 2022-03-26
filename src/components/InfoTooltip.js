import React from 'react';

function InfoTooltip({ onClose, isOpen, img, text }) {
    return (
        <div className={isOpen ? `popup popup_opened` : `popup`}>
            <div onClick={onClose} className="popup__overlay"></div>
            <div className="popup__container">
                <button onClick={onClose} className="popup__button popup__button_type_close" type="button"></button>
                <img className="popup__image" src={img} alt="Статус" />
                <h2 className="popup__text">{text}</h2>
            </div>
        </div>
    )

}

export default InfoTooltip;