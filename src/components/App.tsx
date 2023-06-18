import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Layout from "./Layout";
import { initFirebaseAuth } from "../firebase/firebase";
import { createContext, useState } from "react";

export const UserContext = createContext(false);

function App() {
  const [user, setUser] = useState(false);

  initFirebaseAuth((user: any) => {
    if (user) {
      setUser(user.displayName);
    } else {
      setUser(false);
    }
  });

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<Layout user={user} />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
