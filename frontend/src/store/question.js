import { csrfFetch } from './csrf';

const LOAD_QUESTIONS = '/question/getQuestions'
const ADD_QUESTION = 'question/addQuestion'
const LOAD_QUESTION = '/question/loadQuestionDetail'

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


export const getQuestions = () => async dispatch => {
    const res = await csrfFetch('/api/questions')
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
    if (res.okay) {
        const question = await res.json()
        dispatch(loadQuestionDetail(question))
        return question
    }
}




const initialState = { questions: {}, isLoading: true }

const questionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_QUESTION: {
            newState = { ...state }
            newState.questions = { ...newState.questions, [action.question.id]: action.question }
            return newState
        }
        case LOAD_QUESTIONS: {
            newState = { ...state }
            const questionsList = {}
            action.questions.forEach(question => questionsList[question.id] = question)
            newState.questions = questionsList
            return newState
        }
        case LOAD_QUESTION: {
            newState = { ...state }
            newState.questions = { [action.question.id]: action.question }
            return newState
        }
        default:
            return state;
    }
}

export default questionReducer