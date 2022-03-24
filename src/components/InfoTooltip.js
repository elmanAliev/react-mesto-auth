import React from 'react';
import status from '../images/fail.svg';

function InfoTooltip({ onClose, isOpen, img }) {
    return (
        <div className={isOpen ? `popup popup_opened` : `popup popup_opened`}>
            <div onClick={onClose} className="popup__overlay"></div>
            <div className="popup__container">
                <button onClick={onClose} className="popup__button popup__button_type_close" type="button"></button>
                <img className="popup__image" src={status} alt="Статус" />
                <h2 className="popup__text">Что-то пошло не так! Попробуйте ещё раз.</h2>
            </div>
        </div>
    )

}

export default InfoTooltip;