import React, {useState, useEffect} from 'react';
import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ email, loggedIn}) {

    const currentPath = useLocation();
    const [text, setText] = useState('');
    const [path, setPath] = useState('');

    useEffect(() => {
        if (currentPath.pathname === '/sign-up') {
            setText('Войти')
            setPath('/sign-in')
        }
        if (currentPath.pathname === '/sign-in') {
            setText('Регистрация')
            setPath('/sign-up')
        }
        if (currentPath.pathname === '/main') {
            setText('Выйти')
            setPath('/sign-in')
        }

    }, [currentPath]);

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
                <span className="header__email">{loggedIn ? email : ''}</span>
                <Link className="header__link" to={path} onClick={loggedIn ? signOut : ''} >
                    {text}
                </Link>
            </div>
        </header>
    )
}

export default Header;