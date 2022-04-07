import React from "react";

class Navbar extends React.Component {
  state = {
    view_active: this.props.view_active,
    posts: [],
  };

  onLogoClick = () => {
    this.props.onChangeView(true);
  };

  onProfileClick = () => {
    this.props.onChangeView(false);
  };

  render() {
    return (
      <header className="bd-header">
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="##" onClick={this.onLogoClick}>
              <i className="bi bi-lightning-charge-fill"></i>
              Tree pics
            </a>
            <a
              href="##"
              className="fs-2 text-dark"
              onClick={this.onProfileClick}
            >
              <i className="bi bi-person-circle"></i>
            </a>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;