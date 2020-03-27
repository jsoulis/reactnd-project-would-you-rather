import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveUsers, userAnswer, newQuestionUser} from '../actions/users'
import { receiveQuestions, questionAnswer, newQuestion } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = null;

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}

export function handleAnswerQuestion (info) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer(info)
        .then(() => {
            dispatch(userAnswer(info));
            dispatch(questionAnswer(info));
            dispatch(hideLoading());
        })
    }
}

export function handleNewQuestion (info) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion(info)
        .then((question) => {
            dispatch(newQuestion(question));
            dispatch(newQuestionUser(question));
            dispatch(hideLoading());
        })
    }
}