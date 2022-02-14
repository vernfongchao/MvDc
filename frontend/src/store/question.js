import { csrfFetch } from './csrf';

const LOAD_QUESTIONS = '/question/LOAD_QUESTIONS'
const ADD_QUESTION = 'question/ADD_QUESTION'
const LOAD_QUESTION = '/question/LOAD_QUESTION'
const DELETE_QUESTION = '/question/DELETE_QUESTION'

export const addQuestion = (question) => ({
    type: ADD_QUESTION,
    question
})

export const loadQuestions = (questions) => {
    return {
        type: LOAD_QUESTIONS,
        questions
    }
}

export const loadQuestionDetail = (question) => {
    return {
        type: LOAD_QUESTION,
        question
    }
}

export const removeQuestion = (question) => {
    return {
        type: DELETE_QUESTION,
        question
    }
}


export const getQuestions = () => async dispatch => {
    const res = await csrfFetch('/api/questions')
    if (res.ok) {
        const questions = await res.json()
        dispatch(loadQuestions(questions))
        return questions
    }
}


export const getFiveQuestions = () => async dispatch => {
    const res = await csrfFetch('/api/questions/getmore')
    if (res.ok) {
        const questions = await res.json()
        dispatch(loadQuestions(questions))
        return questions
    }
}


export const getQuestionById = (id) => async dispatch => {
    const res = await csrfFetch(`/api/questions/${id}`)

    if (res.ok) {
        const question = await res.json()
        if (question === null) return null
        dispatch(loadQuestionDetail(question))
        return question
    }
}

export const createQuestion = (payload) => async (dispatch, getstate) => {
    const res = await csrfFetch('/api/questions', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const questions = await res.json()
        dispatch(addQuestion(questions))
        return questions
    }
}

export const editQuestion = (payload) => async (dispatch, getState) => {
    const res = await csrfFetch(`/api/questions/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const question = await res.json()
        dispatch(loadQuestionDetail(question))
        return question
    }
}

export const deleteQuestion = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/questions/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const question = await res.json()
        dispatch(removeQuestion(question))
        return question
    }
}


const initialState = { questions: {}, isLoading: true }

const questionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_QUESTION: {
            newState = { ...state }
            newState.questions = { ...state.questions, [action.question.id]: action.question }
            return newState
        }
        case LOAD_QUESTIONS: {
            newState = { ...state }
            const questionsList = { ...state.questions }
            action.questions.forEach(question => questionsList[question.id] = question)
            newState.questions = questionsList
            return newState
        }
        case LOAD_QUESTION: {
            newState = { ...state }
            newState.questions = { ...state.questions, [action.question.id]: action.question }
            return newState
        }
        case DELETE_QUESTION: {
            newState = { ...state, questions:{...state.questions} }
            delete newState.questions[action.question.id]
            return newState
        }
        default:
            return state;
    }
}

export default questionReducer