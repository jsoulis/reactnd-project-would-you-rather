import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class QuestionSummary extends Component {
  formatText = text => {
    const questionTextArray = text.split(" ");
    const textSummaryWords =
      questionTextArray[1] +
      " " +
      questionTextArray[2] +
      " " +
      questionTextArray[3];
    let textSummmary = "...";
    for (let i = 0; i < 14; i++) {
      textSummmary += textSummaryWords[i];
    }
    textSummmary += "...";

    return textSummmary;
  };

  render() {
    const { question, user } = this.props;

    if (question === null) {
      return <p>This question does not exist</p>;
    }

    const { name, avatarURL } = user;
    const { id } = question;

    return (
      <div className="question-summary-box">
        <div className="question-summary">
          <div className="avatar-summary">
            <div>
              <span>{`${name} asks...`}</span>
            </div>
            <div>
              <img
                src={avatarURL}
                alt={`Avatar of ${name}`}
                className="avatar"
              />
            </div>
          </div>
          <div className="question-summary-info">
            <div>
              <span className="bold">Would you Rather</span>
              <p>{question.optionOne.text}</p>
              <p>{question.optionTwo.text}</p>
            </div>
          </div>
        </div>
        <div className="question-summary">
          <Link to={`/question/${id}`}>
            <button className="btn" type="submit">
              View Poll
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];
  const user = users[question.author];

  return {
    authedUser,
    question,
    user
  };
}

export default withRouter(connect(mapStateToProps)(QuestionSummary));
