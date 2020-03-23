import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { receiveUsers, userAnswer } from '../actions/users'
import { receiveQuestions, questionAnswer } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'

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