import React, { Component } from "react";
import { connect } from "react-redux";
import UserStats from "./UserStats";

class LeaderBoard extends Component {
  render() {
    const { userIds } = this.props;

    return (
      <div>
        <ul>
          {userIds.map(id => (
            <li key={id}>
              <UserStats id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const userIds = Object.keys(users).sort((a, b) => {
    const answers_a = users[a].questions.length;
    const answers_b = users[b].questions.length;
    const questions_a = Object.keys(users[a].answers).length;
    const questions_b = Object.keys(users[b].answers).length;

    return answers_b + questions_b - answers_a - questions_a;
  });

  return {
    userIds
  };
}

export default connect(mapStateToProps)(LeaderBoard);
