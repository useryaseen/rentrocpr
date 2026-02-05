import "../App.css";
import { NavLink } from "react-router-dom";
import logo from "../assets/image.png";

export default function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <img className="h-12 w-auto" src={logo} alt="" />
      </div>
      <nav className="nav-links">
        <NavLink to="/" end className="nav-btn">
          Home
        </NavLink>
        <NavLink to="/quotation-history" className="nav-btn">
          Quotation History
        </NavLink>
        <NavLink to="/new-quotation" className="nav-btn">
          New Quotation
        </NavLink>
        {/* <NavLink to="/create-quotation" className="nav-btn">
          Create Quotation
        </NavLink> */}
      </nav>
      <NavLink to="/new-quotation" className="primary-btn">
        New Quote
      </NavLink>
    </header>
  );
}
