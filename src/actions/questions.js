export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const NEW_QUESTION = 'NEW_QUESTION'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function questionAnswer ({ authedUser, qid, answer }) {
    return {
        type: SAVE_ANSWER,
        qid,
        answer,
        authedUser
    }
}

export function newQuestion (question) {
    return {
        type: NEW_QUESTION,
        question
    }
}
