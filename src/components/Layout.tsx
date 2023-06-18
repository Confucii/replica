import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import "./styles/Layout.css";

function Layout({ user }: { user: any }) {
  return (
    <div className="Layout">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
