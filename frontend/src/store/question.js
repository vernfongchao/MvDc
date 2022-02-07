import { csrfFetch } from './csrf';

const ADD_QUESTION = 'question/ADD_Question'

const addQuestion = (question) => ({
    type: ADD_QUESTION,
    question
})

export const createQuestion = (payload) => async (dispatch, getstate) => {
    const res = await csrfFetch('/api/questions', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    console.log(res)
    if (res.ok) {
        const newQuestion = await res.json()
        dispatch(addQuestion(newQuestion))
        return newQuestion
    }
}



const initialState = { questions: {}, isLoading: true }

const questionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_QUESTION: {
            newState = { ...state }
            newState.questions = { ...newState.entries, [action.newQuestion.id]: action.newQuestion }
            return newState
        }
        default:
            return state;
    }
}

export default questionReducer