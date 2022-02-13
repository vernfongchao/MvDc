import { csrfFetch } from './csrf';


const LOAD_COMMENTS = '/answer/LOAD_COMMENTS'
// const ADD_COMMENTS = 'answer/COMMENTS'
// const REMOVE_COMMENTS = '/answer/REMOVE_COMMENTS'
// const LOAD_COMMENT = '/answer/COMMENT'


const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}


export const getComments = () => async dispatch => {
    const res = await csrfFetch('/api/comments')
    if (res.ok) {
        const comments = await res.json()
        dispatch(loadComments(comments))
        return comments
    }
}

const initialState = { comments: {}, isLoading: true }

const commentReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_COMMENTS: {
            newState = { ...state }
            const commentList = { ...state.comments }
            action.comments.forEach(comment => commentList[comment.id] = comment)
            newState.comments = commentList
            return newState
        }
        default:
            return state;
    }
}

export default commentReducer