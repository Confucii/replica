import "./styles/Dropdown.css";
import { signOutUser } from "../../firebase/firebase";
import { AppContext } from "../App";
import { useContext } from "react";
import signOut from "./images/logout.svg";
import { ContextInterface } from "../../interfaces";
import { useNavigate } from "react-router-dom";

function Dropdown() {
  const context = useContext<ContextInterface>(AppContext);

  const nav = useNavigate();

  function handleSignOut() {
    nav("/");
    context.dropdownHandler.setDropdown(!context.dropdownHandler.dropdown);

    setTimeout(() => {
      signOutUser();
    }, 100);
  }

  return (
    <div
      className="Dropdown"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="dropdown-user-data">
        {context.user.img && (
          <img
            className="dropdown-user-image"
            src={context.user.img}
            alt="profile"
          />
        )}
        <div className="dropdown-user-text">
          <span>{context.user.name}</span>
          <span>{context.user.email}</span>
        </div>
      </div>
      <div className="sign-out" onClick={handleSignOut}>
        <img className="sign-out-img" src={signOut} alt="sign out" />
        <span className="sign-out-text">Sign out</span>
      </div>
    </div>
  );
}

export default Dropdown;
