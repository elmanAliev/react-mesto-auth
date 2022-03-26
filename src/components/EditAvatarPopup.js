import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    } 

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
            name="avatar"
            title="Обновить аватар"
            children={
                <fieldset className="popup__info">
                    <div className="popup__info-item">
                        <input
                            ref={avatarRef}
                            id="avatar-input"
                            className="popup__input popup__input_type_url"
                            type="url"
                            name="url"
                            placeholder="Ссылка на картинку"
                            required
                        />
                        <span className="avatar-input-error popup__input-error"></span>
                    </div>
                </fieldset>
            }
        />
    )
}

export default EditAvatarPopup;