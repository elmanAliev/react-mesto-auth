import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

function Login({handleLogin }) {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState();
    const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);

    function handleChange(e) {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        auth.authorize(password, email)
            .then((data) => {
                if (data.token) {
                    handleLogin();
                    history.push('/');
                }
            })
            .catch((err) => {
                setStatus(false);
                setIsStatusPopupOpen(true);
                console.log(err)
            });
    }

    function handleClose() {
        setIsStatusPopupOpen(false);   
    }


    return (
        <div className="form">
            <h1 className="form__title">Вход</h1>
            <form className="form__main" onSubmit={handleSubmit}>
                <fieldset className="form__fieldset">
                    <div className="form__item">
                        <input
                            value={email}
                            onChange={handleChange}
                            className="form__input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                        <span className="form__input-error"></span>
                    </div>
                    <div className="form__item">
                        <input
                            value={password}
                            onChange={handleChange}
                            className="form__input"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                        <span className="form__input-error"></span>
                    </div>
                </fieldset>
                <button type="submit" className="form__submit-button">Войти</button>
            </form>
            <InfoTooltip
                status={status}
                onClose={handleClose}
                isOpen={isStatusPopupOpen}
            />
        </div>
    )
}

export default Login;