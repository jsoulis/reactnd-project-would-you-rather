import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from  '../actions/shared'
import Question from './Question'
import Pole from './Pole'

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          answer: 'optionOne',
          comments: props.answered
        };
    }

    componentDidMount() {
        const { answered } = this.props;

        this.setState(() => ({
            answer: 'optionOne',
            isAnswered: answered
        }), () => {
            console.log(this.state)
        })

    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch, qid, authedUser } = this.props;

        console.log('Handle Submit')

        this.setState(() => ({
            isAnswered: true
        }), () => {
            console.log(qid, this.state.answer, authedUser, this.state.isAnswered)
            const answer = this.state.answer;
            dispatch(handleAnswerQuestion({authedUser, qid, answer}))
        })

    }

    handleChange = (e) => {

        const answer = e.target.value;
        console.log(answer)

        this.setState(() => ({
            answer
        }))

    }

    render() {

        const { qid } = this.props;
        const isAnswered = this.state.isAnswered;

        return (
            <Fragment>
              {isAnswered 
                ? <Pole qid={qid}/>
                : <Question handleSubmit={this.handleSubmit} handleChange={this.handleChange} qid={qid}/>}  
            </Fragment>
        )
    }

}


function mapStateToProps({ questions, users, authedUser }, props) {
    const { id } = props.match.params;
    const question = questions[id];
    const user = users[question.author];
    const answered = Object.keys(users[authedUser].answers)
    const status = answered.includes(id);

    return {
        authedUser,
        question,
        user, 
        qid: id,
        answered: status
    }
}

export default connect(mapStateToProps)(QuestionPage)