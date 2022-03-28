import React from 'react';
import headerLogo from '../images/logo.svg';
import { Route, Switch, Link, useLocation } from 'react-router-dom';

function Header({ email }) {

    const currentPath = useLocation();

    function signOut() {
        localStorage.removeItem('token');
    }

    return (
        <header className="header">
            <img
                className="header__logo"
                src={headerLogo}
                alt='Логотип сервиса Mesto-Russia'
            />
            <Switch>
                <Route path="/sign-up">
                    <Link className="header__link" to='sign-in'>Войти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link className="header__link" to='sign-up'>Регистрация</Link>
                </Route>
                <Route path="/main">
                    <div>
                        <span className="header__email">{email}</span>
                        <Link className="header__link" to='/sign-in' onClick={signOut}>Выйти</Link>
                    </div>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;