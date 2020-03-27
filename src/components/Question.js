import React, { Component } from 'react'
import { connect } from 'react-redux'


class Question extends Component {
    render() {

        const { question, user, handleChange, handleSubmit } = this.props;

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
                <form onSubmit={handleSubmit}>
                    <p>Would you rather...</p>
                    <div>
                    <div>
                        <label>
                            <input
                            type="radio"
                            name="answers"
                            value="optionOne"
                            onChange={handleChange}
                            defaultChecked={true}
                            />
                            {q1}
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                            type="radio"
                            name="answers"
                            onChange={handleChange}
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


function mapStateToProps({ questions, users, authedUser }, {qid}) {
    const question = questions[qid];
    const user = users[question.author];
    const answered = Object.keys(users[authedUser].answers)

    return {
        authedUser,
        question,
        user, 
        qid: qid,
        answered
    }
}

export default connect(mapStateToProps)(Question)