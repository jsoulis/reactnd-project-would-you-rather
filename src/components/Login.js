import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  handleSubmit = e => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(e.target.value));
  };

  render() {
    const { id, users } = this.props;

    return (
      <div className="center">
        <h2>Please Choose a User</h2>
        <ul>
          {id.map(id => (
            <li key={id}>
              <button
                value={id}
                onClick={this.handleSubmit}
                className="btn"
                type="submit"
              >
                {users[id].name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const id = Object.keys(users);

  return {
    id,
    users
  };
}

export default connect(mapStateToProps)(Login);
