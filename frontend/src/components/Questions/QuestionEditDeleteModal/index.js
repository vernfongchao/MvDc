import React,{createContext,useContext, useState} from "react";
import { Modal } from "../../../context/Modal";
import EditDeleteQuestionMenu from "./EditDeleteQuestionMenu";
import * as BsIcons from 'react-icons/bs'

import './EditDeleteModal.css'

export const EditDeleteContext = createContext()
export const useEditDeleteModal = () => useContext(EditDeleteContext)

const EditDeleteModal = ({question}) => {
    const [editDeleteModal, setEditDeleteModal] = useState(false)

    return (
        <EditDeleteContext.Provider
            value={{ editDeleteModal, setEditDeleteModal,question}}>

            <div className="edit-delete-modal-container">
                <div className="edit-delete-button-container" >
                    <BsIcons.BsGearWideConnected className="edit-delete-modal-button" onClick={() => setEditDeleteModal(true)}/>
                </div>
                {editDeleteModal && (
                    <Modal onClose={() => setEditDeleteModal(false)}>
                        <EditDeleteQuestionMenu />
                    </Modal>
                )}
            </div>
        </EditDeleteContext.Provider>
    )
}

export default EditDeleteModal