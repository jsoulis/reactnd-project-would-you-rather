export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_ANSWER_USER = 'SAVE_ANSWER_USER'
export const NEW_QUESTION_USER = 'NEW_QUESTION_USER'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function userAnswer ({ authedUser, qid, answer }) {
    return {
        type: SAVE_ANSWER_USER,
        qid,
        answer,
        authedUser
    }
}

export function newQuestionUser(question) {
    return {
        type: NEW_QUESTION_USER,
        question
    }
}