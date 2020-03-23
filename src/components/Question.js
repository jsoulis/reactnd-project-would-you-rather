import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from  '../actions/shared'

class Question extends Component {
    componentDidMount() {
        const { answered, qid } = this.props;

        this.setState(() => ({
            answer: 'optionOne',
            isAnswered: answered.includes(qid)
        }))

        
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch, qid, authedUser } = this.props;

        this.setState(() => ({
            isAnswered: true
        }), () => {
            console.log(qid, this.state.answer, authedUser)
            const answer = this.state.answer;
            dispatch(handleAnswerQuestion({authedUser, qid, answer}))
        })

        //dispatch(handleAnswerQuestion(qid, e.value, authedUser))
        //Todo: Handle submit when someone answers a questions.

    }

    handleChange = (e) => {

        const answer = e.target.value;
        console.log(answer)

        this.setState(() => ({
            answer
        }))

    }

    render() {

        const { question, user } = this.props;

        if (question === null) {
            return <p>This question does not exist</p>
        }

        const { name, avatarURL } = user;
        const q1 = question.optionOne.text;
        const q2 = question.optionTwo.text;

        return(
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
                <form onSubmit={this.handleSubmit}>
                    <p>Would you rather...</p>
                    <div>
                    <div>
                        <label>
                            <input
                            type="radio"
                            name="answers"
                            value="optionOne"
                            onChange={this.handleChange}
                            defaultChecked={true}
                            />
                            {q1}
                        </label>
                        <label>
                            <input
                            type="radio"
                            name="answers"
                            onChange={this.handleChange}
                            value="optionTwo"
                            />
                            {q2}
                        </label>
                    </div>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}


function mapStateToProps({ questions, users, authedUser }, props) {
    const { id } = props.match.params;
    const question = questions[id];
    const user = users[question.author];
    const answered = Object.keys(users[authedUser].answers)

    return {
        authedUser,
        question,
        user, 
        qid: id,
        answered
    }
}

export default connect(mapStateToProps)(Question)