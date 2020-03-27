import React, { Component } from "react";
import { connect } from "react-redux";

class UserStats extends Component {
  render() {
    const { user, numAuthored, numAnswered, score } = this.props;

    const { avatarURL, name } = user;

    return (
      <div className="question">
        <div>
          <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        </div>
        <div className="allign-text-right">
          <p>{name}</p>
          <div>
            <p>{`Answered questions: ${numAnswered}`}</p>
            <p>{`Created questions: ${numAuthored}`}</p>
          </div>
        </div>
        <div className="score">
          <p>{`Score: ${score}`}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  const numAnswered = Object.keys(user.answers).length;
  const numAuthored = user.questions.length;
  const score = numAuthored + numAnswered;

  return {
    user,
    numAnswered,
    numAuthored,
    score
  };
}

export default connect(mapStateToProps)(UserStats);
