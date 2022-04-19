import React from "react";
import QuestionEditModal from '../QuestionEdit'
import QuestionDeleteModal from "../QuestionDelete";

const EditDeleteQuestionMenu = () => {
    return (
        <div>
            <QuestionEditModal />
            <QuestionDeleteModal />
        </div>
    )
}

export default EditDeleteQuestionMenu