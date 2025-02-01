import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { setStateChangeHandler } from "./api";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState();

  // Устанавливаем состояние зарегистрированного пользователя
  const authStateChange = (__user) => {
    setUser(__user);
  };

  // Получаем объект зарегистрированного пользователя
  useEffect(() => {
    const unsubscribe = setStateChangeHandler(authStateChange);
    return () => unsubscribe();
  }, []);

  const handleBurgerClick = (evt) => {
    evt.preventDefault();
    setShowMenu(!showMenu);
  };

  return (
    <div className="container">
      <nav className="navbar px-2">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "navbar-item is-uppercase" + (isActive ? "is-active" : "")
            }
          >
            {user ? user.email : "Todos"}
          </NavLink>
          <a
            href="/"
            className={showMenu ? "navbar-burger is-active" : "navbar-burger"}
            onClick={handleBurgerClick}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div
          className={showMenu ? "navbar-menu is-active" : "navbar-menu"}
          onClick={handleBurgerClick}
        >
          <div className="navbar-start">
            {user && <NavLink to="/add" className="navbar-item">Создать дело</NavLink>}
            {!user && (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  "navbar-item" + (isActive ? "is-active" : "")
                }
              >
                Зарегистрироваться
              </NavLink>
            )}
            {
              !user && (
                <NavLink
                  to="/login"
                  className={ ({isActive}) => "navbar-item" + (isActive ? "is-active" : "") }
                >Вход</NavLink>
              )
            }
          </div>
          {
            user && (
              <div className='navbar-end'>
                <NavLink to="/logout" className="navbar-item">Выйти</NavLink>
              </div>
            )
          }
        </div>
      </nav>
      <main className="context px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
