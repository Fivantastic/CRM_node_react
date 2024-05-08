import { Header } from "../components/Header/Header.jsx";
import { NavBar } from "../components/NavBar/NavBar.jsx";
import './mainLayout.css'; 

export function MainLayout({ children }) {
  return (
    <div className="main-layout-container">
      <NavBar className="navbar-layout" />
      <Header className="header-layout" />
      <main className="main-layout">{children}</main>
    </div>
  );
}
