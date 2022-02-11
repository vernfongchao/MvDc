import { csrfFetch } from './csrf';

const LOAD_ANSWERS = '/answer/LOAD_ANSWERS'
const ADD_ANSWER = 'answer/ADD_ANSWERS'
const DELETE_ANSWER = '/answer/DELETE_ANSWERS'

export const addAnswer = (answer) => ({
    type: ADD_ANSWER,
    answer
})

export const loadQuestions = (answers) => {
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


// export const getAnswers = () => async dispatch => {
//     const res = await csrfFetch('/api/questions')
//     if (res.ok) {
//         const questions = await res.json()
//         dispatch(loadQuestions(questions))
//         return questions
//     }
// }

export const getAnswerByQuestion = (id) => async dispatch => {
    const res = await csrfFetch(`/api/answers/question/${id}`)
    if (res.ok) {
        const answers = await res.json()
        dispatch(loadQuestions(answers))
        return answers
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
        default:
            return state;
    }
}

export default answerReducer