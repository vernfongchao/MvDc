import { csrfFetch } from './csrf';

const LOAD_ANSWERS = '/answer/LOAD_ANSWERS'
const ADD_ANSWER = 'answer/ADD_ANSWERS'
const DELETE_ANSWER = '/answer/DELETE_ANSWERS'

export const addAnswer = (answer) => ({
    type: ADD_ANSWER,
    answer
})

export const loadAnswers = (answers) => {
    return {
        type: LOAD_ANSWERS,
        answers
    }
}

export const removeAnswer = (answer) => {
    return {
        type: DELETE_ANSWER,
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

// newState = { ...state }
// newState.questions = { ...state.questions, [action.question.id]: action.question }
// return newState

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
        default:
            return state;
    }
}

export default answerReducer