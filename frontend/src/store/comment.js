import { csrfFetch } from './csrf';


const LOAD_COMMENTS = '/answer/LOAD_COMMENTS'
const ADD_COMMENT = 'answer/ADD_COMMENT'
// const REMOVE_COMMENTS = '/answer/REMOVE_COMMENTS'
// const LOAD_COMMENT = '/answer/COMMENT'

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

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

export const postComment = (payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/answer/${payload.answerId}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    console.log(res)
    console.log(res.ok)
    if (res) {
        const comment = await res.json()
        console.log(comment)
        dispatch(addComment(comment))
        return comment
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
        case ADD_COMMENT: {
            newState = { ...state }
            newState.comments = { ...state.comments, [action.comment.id]: action.comment }
            return newState
        }
        default:

            return state;
    }
}

export default commentReducer