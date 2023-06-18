import { useContext } from "react";
import { signIn, signOutUser } from "../../firebase/firebase";
import "./styles/Header.css";
import { UserContext } from "../App";

function Header() {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <div className="Header">
      <button onClick={signIn}>Sign-in</button>
      <button onClick={signOutUser}>Sign-out</button>
    </div>
  );
}

export default Header;
