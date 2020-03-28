import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import QuestionList from "./QuestionList";
import Nav from "./Nav";
import QuestionPage from "./QuestionPage";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import Login from "./Login";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {this.props.loading === true ? (
              <Login />
            ) : (
              <div>
                <Nav />
                <div className="center">
                  <Route path="/" exact component={QuestionList} />
                </div>
                <Route path="/question/:id" component={QuestionPage} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/add" component={NewQuestion} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
