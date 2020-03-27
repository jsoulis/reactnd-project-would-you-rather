import React, { Component } from "react";
import { connect } from "react-redux";
import { handleNewQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOneText: "",
      optionTwoText: "",
      submit: false
    };
  }

  handleChangeOp1 = e => {
    const optionOneText = e.target.value;

    this.setState(() => ({
      optionOneText
    }));
  };

  handleChangeOp2 = e => {
    const optionTwoText = e.target.value;

    this.setState(() => ({
      optionTwoText
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, author } = this.props;

    dispatch(handleNewQuestion({ optionOneText, optionTwoText, author }));
    this.setState(() => ({
      submit: true
    }));
    this.setState(() => ({
      optionOneText: "",
      optionTwoText: ""
    }));
  };

  render() {
    const { optionOneText, optionTwoText, submit } = this.state;
    if (submit === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="center">
        <h3>Create New Question</h3>
        <p>Complete the questions:</p>
        <div>
          <p>Would you rather...</p>
          <form className="new-question" onSubmit={this.handleSubmit}>
            <textarea
              placeholder="Enter Option One Text Here"
              value={optionOneText}
              onChange={this.handleChangeOp1}
              className="textarea"
              maxLength={280}
            />
            <textarea
              placeholder="Enter Option One Text Here"
              value={optionTwoText}
              onChange={this.handleChangeOp2}
              className="textarea"
              maxLength={280}
            />
            <button
              className="btn"
              type="submit"
              disabled={optionOneText === "" || optionTwoText === ""}
            >
              submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    author: authedUser
  };
}

export default connect(mapStateToProps)(NewQuestion);
