import { csrfFetch } from './csrf';

const LOAD_QUESTIONS = '/question/getQuestions'
const ADD_QUESTION = 'question/addQuestion'

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



export const getQuestions = () => async dispatch => {
    const res = await csrfFetch('/api/questions')
    if (res.ok) {
        const questions = await res.json()
        dispatch(loadQuestions(questions))
        return questions
    }
}


export const createQuestion = (payload) => async (dispatch, getstate) => {
    const res = await csrfFetch('/api/questions', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    console.log(res)
    if (res.ok) {
        const question = await res.json()
        dispatch(addQuestion(question))
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
        default:
            return state;
    }
}

export default questionReducer