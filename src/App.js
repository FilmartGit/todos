import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function App() {

  const [showMenu, setShowMenu] = useState(false);

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
            Todos
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
        <div className={showMenu ? "navbar-menu is-active" : "navbar-menu"} onClick={handleBurgerClick}>
          <div className="navbar-start">
            <NavLink
              to="add"
              className={({ isActive }) =>
                "navbar-item is-uppercase" + (isActive ? "is-active" : "")
              }
            >
              Создать дело
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="context px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
