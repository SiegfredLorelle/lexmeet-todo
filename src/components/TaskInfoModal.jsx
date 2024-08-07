import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const TaskInfoModal = ({ isOpen, onClose, task }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal task-info-modal" id="taskModal">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="modal-content">
          <h2 className="modal-title">Task Details</h2>
          <div className="modal-body">
            <div className="task-info">
              <table className="task-info-table">
                <tbody>
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td id="taskName">{task.name}</td>
                  </tr>
                  <tr>
                    <td><strong>Description:</strong></td>
                    <td id="taskDescription">{task.description || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Priority:</strong></td>
                    <td id="taskPriority">
                      {task.priority}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td id="taskStatus">{task.status}</td>
                  </tr>
                  <tr>
                    <td><strong>Deadline:</strong></td>
                    <td id="taskDeadline">{task.deadline}</td>
                  </tr>
                  <tr>
                    <td><strong>Completed At:</strong></td>
                    <td id="taskCompletedAt">{task.completedAt || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Date Created:</strong></td>
                    <td id="taskDateCreated">{task.createdAt}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskInfoModal;
