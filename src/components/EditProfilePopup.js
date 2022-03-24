import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {
    const userInfo = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(userInfo.name || '');
        setDescription(userInfo.about || '');
    }, [userInfo, isOpen]); 

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateUser({
          name: name,
          about: description,
        });
    } 

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
            name="edit"
            title="Редактировать профиль"
            children={
                <fieldset className="popup__info">
                    <div className="popup__info-item">
                        <input
                            value={name}
                            onChange={handleChangeName}
                            id="name-input"
                            className="popup__input popup__input_type_name"
                            type="text"
                            name="name"
                            placeholder="Имя"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                        <span className="name-input-error popup__input-error"></span>
                    </div>
                    <div className="popup__info-item">
                        <input
                            value={description}
                            onChange={handleChangeDescription}
                            id="job-input"
                            className="popup__input popup__input_type_job"
                            type="text"
                            name="job"
                            placeholder="Профессиональная деятельность"
                            minLength="2"
                            maxLength="200"
                            required
                        />
                        <span className="job-input-error popup__input-error"></span>
                    </div>
                </fieldset>
            }
        />
    )
}

export default EditProfilePopup;