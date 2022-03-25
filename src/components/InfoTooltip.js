import React from 'react';
import statusFail from '../images/fail.svg';
import statusOk from '../images/success.svg';

function InfoTooltip({ onClose, isOpen, status }) {
    return (
        <div className={isOpen ? `popup popup_opened` : `popup`}>
            <div onClick={onClose} className="popup__overlay"></div>
            <div className="popup__container">
                <button 
                    onClick={onClose} 
                    className="popup__button popup__button_type_close" 
                    type="button" 
                />
                <img 
                    className="popup__image" 
                    src={status ? statusOk : statusFail} 
                    alt="Статус" 
                />
                <h2 className="popup__text">
                    {status 
                        ? "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так! Попробуйте ещё раз."
                    }
                </h2>
            </div>
        </div>
    )

}

export default InfoTooltip;