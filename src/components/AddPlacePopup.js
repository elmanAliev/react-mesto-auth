import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [place, setPlace] = useState('');
    const [url, setUrl] = useState('');

    function handleChangePlace(e) {
        setPlace(e.target.value);
    }

    function handleChangeUrl(e) {
        setUrl(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        onAddPlace({
            name: place,
            link: url,
        });
    } 

    useEffect(() => {
        setPlace('');
        setUrl('')
    }, [isOpen]); 

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
            name="add"
            title="Новое место"
            children={
                <fieldset className="popup__info">
                    <div className="popup__info-item">
                        <input
                            value={place}
                            onChange={handleChangePlace}
                            id="place-input"
                            className="popup__input popup__input_type_place"
                            type="text"
                            name="place"
                            placeholder="Название"
                            minLength="2"
                            maxLength="30"
                            required
                        />
                        <span className="place-input-error popup__input-error"></span>
                    </div>
                    <div className="popup__info-item">
                        <input
                            value={url}
                            onChange={handleChangeUrl}
                            id="url-input"
                            className="popup__input popup__input_type_url"
                            type="url"
                            name="url"
                            placeholder="Ссылка на картинку"
                            required
                        />
                        <span className="url-input-error popup__input-error"></span>
                    </div>
                </fieldset>
            }
        />
    )
}

export default AddPlacePopup;