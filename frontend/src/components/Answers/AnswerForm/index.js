import React, { useState } from "react"
import { Modal } from "../../../context/Modal"
import AnswerForm from "./AnswerForm"

const AnswerFormModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="answer-form-modal-container">
            <div className="'open-answer-model">
                <button className='open-answer-button'onClick={() => setShowModal(true)}>Answer</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AnswerForm setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    )

}

export default AnswerFormModal