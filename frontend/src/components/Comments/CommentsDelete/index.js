import React, { useState } from 'react'
import { Modal } from '../../../context/Modal'
import CommentsDelete from './CommentsDelete'

import './CommentsDelete.css'

const CommentDeleteModal = ({id}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <div className='comment-delete-button-container'>
                <button className='commente-delete-button' onClick={()=> setShowModal(true)}>Delete</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CommentsDelete setShowModal={setShowModal} id={id}/>
                </Modal>
            )}
        </div>
    )
}

export default CommentDeleteModal