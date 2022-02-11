import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import AnswerEdit from "./AnswerEdit"

const AnswerEditModal = ({ id, answerContent }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="'open-answer-button">
                <button onClick={() => setShowModal(true)}>Edit</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AnswerEdit setShowModal={setShowModal} id={id} answerContent={answerContent} />
                </Modal>
            )}
        </div>
    )

}

export default AnswerEditModal