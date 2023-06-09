import { useContext } from "react";
import { signIn } from "../../firebase/firebase";
import "./styles/User.css";
import { AppContext } from "../App";
import Dropdown from "./Dropdown";
import { ContextInterface } from "../../interfaces";
import { useNavigate } from "react-router-dom";

function User() {
  const context = useContext<ContextInterface>(AppContext);

  const nav = useNavigate();

  function handleLogIn() {
    nav("/");
    signIn();
  }

  return (
    <div className="User">
      {context.user.name ? (
        <div className="user-data">
          {context.user.img && (
            <img
              className="user-img"
              onClick={() =>
                context.dropdownHandler.setDropdown(
                  !context.dropdownHandler.dropdown
                )
              }
              src={context.user.img}
              alt="profile"
            />
          )}
          {context.dropdownHandler.dropdown && <Dropdown />}
        </div>
      ) : (
        <button className="sign-in-btn" onClick={handleLogIn}>
          Sign in
        </button>
      )}
    </div>
  );
}

export default User;
