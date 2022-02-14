import React,{useState} from "react";
import {useDispatch,useSelector} from 'react-redux'

const CommentEdit = ({answerId,content,userId,User,id}) => {


    const [newContent, setNewContent] = useState(content)
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const comment = {
            id
        }

    }


    return(
        <div>

        </div>
    )
}

export default CommentEdit


{/* <div className=''>
<label htmlFor='title'>
    <br />
    <textarea
        className='question-edit-input-text'
        id='title'
        rows='3'
        cols='60'
        value={title}
        placeholder='Question'
        onChange={(event) => setTitle(event.target.value)}
        required
    ></textarea>
</label>
</div> */}