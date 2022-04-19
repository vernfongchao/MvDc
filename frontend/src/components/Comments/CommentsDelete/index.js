import React, { useState } from 'react'
import { Modal } from '../../../context/Modal'
import CommentsDelete from './CommentsDelete'
import CommentEditModal from '../CommentEdit'

import './CommentsDelete.css'

const CommentDeleteModal = ({comment}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className='comment-delete-edit-container'>
            <div className='comment-delete-button-container'>
                <CommentEditModal comment={comment} />
                <button className='comment-delete-button' onClick={() => setShowModal(true)}>Delete</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CommentsDelete setShowModal={setShowModal} comment={comment} />
                </Modal>
            )}
        </div>
    )
}

export default CommentDeleteModal