import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const DeleteTaskModal = ({ isOpen, onClose, task, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal delete-task-modal" id="deleteTaskModal">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="modal-content">
          <h2 className="modal-title">Delete Task</h2>
          <div className="modal-body">
            <p>Are you sure you want to delete the task "{task.name}"?</p>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="cancel-button">Cancel</button>
            <button onClick={onConfirm} className="confirm-button">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteTaskModal;
