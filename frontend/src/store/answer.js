import { csrfFetch } from './csrf';

const LOAD_ANSWERS = '/answer/LOAD_ANSWERS'
const ADD_ANSWER = 'answer/ADD_ANSWERS'
const REMOVE_ANSWER = '/answer/REMOVE_ANSWER'
const LOAD_ANSWER = '/answer/LOAD_ANSWER'

const addAnswer = (answer) => ({
    type: ADD_ANSWER,
    answer
})

const loadAnswers = (answers) => {
    return {
        type: LOAD_ANSWERS,
        answers
    }
}

const removeAnswer = (answerId) => {
    return {
        type: REMOVE_ANSWER,
        answerId
    }
}
const loadAnswer = (answer) => {
    return {
        type: LOAD_ANSWER,
        answer
    }
}


export const getAnswers = () => async dispatch => {
    const res = await csrfFetch('/api/answers')
    if (res.ok) {
        const answers = await res.json()
        dispatch(loadAnswers(answers))
        return answers
    }
}

export const getAnswerByQuestion = (id) => async dispatch => {
    const res = await csrfFetch(`/api/answers/question/${id}`)
    if (res.ok) {
        const answers = await res.json()
        dispatch(loadAnswers(answers))
        return answers
    }
}

export const editAnswer = (payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/answers/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const answer = await res.json()
        dispatch(loadAnswer(answer))
        return answer
    }
}


export const postAnswer = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/answers/question/${payload.id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const answer = await res.json()
        dispatch(addAnswer(answer))
        return answer
    }
}

export const deleteAnswer = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/answers/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const answerId = await res.json()
        dispatch(removeAnswer(answerId))
        return answerId
    }
}

const initialState = { answers: {}, isLoading: true }

const answerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ANSWERS: {
            newState = { ...state }
            const answerList = { ...state.answers }
            action.answers.forEach(answer => answerList[answer.id] = answer)
            newState.answers = answerList
            return newState
        }
        case ADD_ANSWER: {
            newState = { ...state }
            newState.answers = { ...state.answers, [action.answer.id]: action.answer }
            return newState
        }
        case LOAD_ANSWER: {
            newState = { ...state }
            newState.answers = { ...state.answers, [action.answer.id]: action.answer }
            return newState
        }
        case REMOVE_ANSWER: {
            newState = { ...state }
            delete newState.answers[action.answerId]
            return newState
        }
        default:
            return state;
    }
}

export default answerReducer