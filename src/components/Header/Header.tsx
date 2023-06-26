import { NavLink } from "react-router-dom";
import User from "./User";
import "./styles/Header.css";
import logo from "./images/home-sound-out.svg";
import Search from "./Search";
import { useContext } from "react";
import { AppContext } from "../App";
import { signIn } from "../../firebase/firebase";
import { ContextInterface } from "../../interfaces";

function Header() {
  const context = useContext<ContextInterface>(AppContext);

  function librarySignInHandler() {
    if (!context.user) {
      signIn();
    }
  }

  return (
    <div className="Header">
      <NavLink to="/">
        <img className="logo" src={logo} alt="sounds of house" />
      </NavLink>
      <nav className="nav-list">
        <NavLink className="link" to="/">
          Home
        </NavLink>
        <NavLink className="link" to="library" onClick={librarySignInHandler}>
          Library
        </NavLink>
        <Search />
      </nav>
      <User />
    </div>
  );
}

export default Header;
