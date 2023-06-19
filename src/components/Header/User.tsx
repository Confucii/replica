import { useContext } from "react";
import { signIn } from "../../firebase/firebase";
import "./styles/User.css";
import { AppContext } from "../App";
import Dropdown from "./Dropdown";

function User() {
  const context = useContext<any>(AppContext);

  return (
    <div className="User">
      {context.user ? (
        <div className="user-data">
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
          {context.dropdownHandler.dropdown && <Dropdown />}
        </div>
      ) : (
        <button className="sign-in-btn" onClick={signIn}>
          Sign in
        </button>
      )}
    </div>
  );
}

export default User;
