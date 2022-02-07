import { csrfFetch } from './csrf';

const ADD_QUESTION = 'question/ADD_Question'

const addQuestion = (question) => ({
    type: ADD_QUESTION,

    question
})

export const createQuestion = (payload) => async (dispatch, getstate) => {
    const res = await fetch('/api/questions', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    console.log(res)
    if (res.ok) {
        const newArticle = await res.json()
        dispatch(addArticle(newArticle))
        return newArticle
    }
}



const initialState = { questions: {}, isLoading: true }

const questionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_QUESTION: {
            newState = { ...state }
            newState.questions = { ...newState.entries, action.}
        }
    }
}