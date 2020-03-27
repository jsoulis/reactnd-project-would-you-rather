import React, { Component } from "react";
import { connect } from "react-redux";

class Pole extends Component {
  render() {
    const { question, user } = this.props;

    if (question === null) {
      return <p>This question does not exist</p>;
    }

    const { name, avatarURL } = user;
    const q1 = question.optionOne.text;
    const q2 = question.optionTwo.text;

    const q1Votes = question.optionOne.votes.length;
    const q2Votes = question.optionTwo.votes.length;
    const totalVotes = q1Votes + q2Votes;

    return (
      <div className="question">
        <div>
          <span>{`Asked by ${name}`}</span>
          <div>
            <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
          </div>
        </div>
        <div></div>
        <div className="pole-card">
          <div className="pole-card">
            <div className="results">
              <span>{q1}</span>
              <p>{`${q1Votes} out of ${totalVotes}`}</p>
            </div>
            <div className="results">
              <span>{q2}</span>
              <p>{`${q2Votes} out of ${totalVotes}`}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { qid }) {
  const question = questions[qid];
  const user = users[question.author];
  const answered = Object.keys(users[authedUser].answers);

  return {
    authedUser,
    question,
    user,
    qid,
    answered
  };
}

export default connect(mapStateToProps)(Pole);
