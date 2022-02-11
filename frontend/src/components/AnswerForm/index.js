import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import AnswerForm from "./AnswerForm"

const AnswerFormModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="'open-answer-button">
                <button onClick={() => setShowModal(true)}>Answer</button>
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