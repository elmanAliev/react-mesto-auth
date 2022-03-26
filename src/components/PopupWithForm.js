import React, {useEffect} from 'react';

function PopupWithForm({ onSubmit, onClose, isOpen, name, title, children }) {

    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [isOpen])

    return (
        <div className={isOpen ? `popup popup_opened popup_type_${name}` : `popup popup_type_${name}`}>
            <div onClick={onClose} className="popup__overlay"></div>
            <form className="popup__container" name={name} onSubmit={onSubmit}>
                <button onClick={onClose} className="popup__button popup__button_type_close" type="button"></button>
                <h2 className="popup__title">{title}</h2>
                {children}
                <button className="popup__button popup__button_type_save main-button">Cохранить</button>
            </form>
        </div>
    )
}

export default PopupWithForm;