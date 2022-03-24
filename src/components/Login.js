import { React, useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        const data = {
            email,
            password,
        }
        console.log(data);
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
        </div>
    )
}

export default Login;