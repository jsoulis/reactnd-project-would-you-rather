import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionSummary from './QuestionSummary'

class QuestionList extends Component {

    state = {
        answered: false,
    }

    handleClickAnswered = (e) => {
        e.preventDefault()
        console.log('hello')

        this.setState(() => ({
            answered: true
        }))

    }

    handleClickUnanswered = (e) => {
        e.preventDefault()

        this.setState(() => ({
            answered: false
        }))
    
    }

    render() {
        const { answered } = this.state;
        const { unansweredIds, answeredIds} = this.props;

        return (
            <div className='center-adjusted'>
                <div className='center'>
                    <button
                        className='btn'
                        onClick={this.handleClickUnanswered}
                    >
                        Unanswered
                    </button>
                    <button
                        className='btn'
                        onClick={this.handleClickAnswered}
                    >
                        Answered
                    </button>
                </div>
                <ul>
                    {!answered && unansweredIds.map((id) => (
                        <li key={id}>
                            <QuestionSummary id={id}/>
                        </li>
                    ))}
                    {answered && answeredIds.map((id) => (
                        <li key={id}>
                            <QuestionSummary id={id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }) {
    const user = users[authedUser];
    const answered = user ? Object.keys(user.answers) : [];
    let unansweredRaw = questions ? Object.keys(questions) : [];
    let unanswered = [];
    unanswered = unansweredRaw.filter(val => !answered.includes(val));
      

    return {
        unansweredIds: unanswered.sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        answeredIds: answered.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    };
}

export default connect(mapStateToProps)(QuestionList)