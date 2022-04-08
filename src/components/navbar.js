import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="bd-header">
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="bi bi-lightning-charge-fill" />
             Tree pics
          </Link>
          <Link to="/profile" className="fs-2 text-dark">
            <i className="bi bi-person-circle"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;