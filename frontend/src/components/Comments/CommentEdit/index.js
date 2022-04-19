import React, {useState} from 'react'
import { Modal } from '../../../context/Modal'
import CommentEdit from './CommentEdit'

import './CommentEdit.css'



const CommentEditModal = ({comment}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='comment-edit-modal-container'>
            <div>
                <button className='comment-edit-button' onClick={() => setShowModal(true)}>Edit</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CommentEdit setShowModal={setShowModal} comment={comment}/>
                </Modal>
            )}
        </div>
    )
}

export default CommentEditModal