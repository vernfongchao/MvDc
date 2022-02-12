import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
                {/* <img
                    className="modal-background-img"
                    src="https://estaticos.megainteresting.com/media/cache/1140x_thumb/uploads/images/gallery/5da5a5fa5bafe827843c9877/marvel-heroes_0.jpg"
                    alt=''
                /> */}
                {children}
            </div>
            <div className="modal-cancel">
                <p>Click out to cancel</p>
            </div>
        </div>,
        modalNode
    );
}

