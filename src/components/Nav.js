import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authedUser";

class Nav extends Component {
  logout = e => {
    const { dispatch } = this.props;

    dispatch(logoutUser());
  };

  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/Leadership" activeClassName="active">
              Leader Board
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={this.logout}
              to="/"
              activeClassName="active-logout"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default connect()(Nav);
