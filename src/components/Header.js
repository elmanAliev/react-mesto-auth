import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

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
            <div>
                {
                    (currentPath.pathname === '/sign-up')
                        ? <Link className="header__link" to='sign-in'>Войти</Link>
                        : ''
                }
                {
                    (currentPath.pathname === '/sign-in')
                        ? <Link className="header__link" to='sign-up'>Регистрация</Link>
                        : ''
                }
                {
                    (currentPath.pathname === '/main')
                        ? <>
                            <span className="header__email">{email}</span>
                            <Link className="header__link" to='/sign-in' onClick={signOut}>
                                Выйти
                            </Link>
                          </>
                        : ''
                }

            </div>
        </header>
    )
}

export default Header;