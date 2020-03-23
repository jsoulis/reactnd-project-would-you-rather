import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom'


class QuestionSummary extends Component {

    formatText = (text) => {
        const questionTextArray = text.split(" ");
        const textSummaryWords = questionTextArray[1] + " " + questionTextArray[2] + " " + questionTextArray[3];
        let textSummmary = '...';
        for(let i = 0; i < 14; i++) {
            textSummmary += textSummaryWords[i];
        }
        textSummmary += '...';

        return textSummmary;
    }

    render() {
        const { question, user } = this.props;

        if (question === null) {
            return <p>This question does not exist</p>
        }

        const { name, avatarURL } = user;
        const { id } = question;
        const text = question.optionOne.text;

        const textSummary = this.formatText(text);
        
        return (
            <div className='question'>
               <div>
                    <div>
                        <span>{`${name} asks...`}</span>
                    </div>
                    <div>
                        <img
                            src={avatarURL}
                            alt={`Avatar of ${name}`}
                            className='avatar'
                        />
                    </div> 
                </div>
                <div className='question-info'>
                    <div>
                        <span>Would you Rather</span>
                        <p>{textSummary}</p>
                        <Link to={`/question/${id}`}>
                            <button className='btn' type='submit'>
                                View Poll
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
    const question = questions[id];
    const user = users[question.author];

    return {
        authedUser,
        question,
        user
    }
}

export default withRouter(connect(mapStateToProps)(QuestionSummary))