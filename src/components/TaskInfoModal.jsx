import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';

const TaskInfoModal = ({ isOpen, onClose, task }) => {
  const formatDate = (dateString) => {
    return format(parseISO(dateString), 'PP p');
  };

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
                    <td id="taskName" className="task-info-content">{task.name}</td>
                  </tr>
                  <tr>
                    <td><strong>Description:</strong></td>
                    <td id="taskDescription" className="task-info-content">{task.description || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Priority:</strong></td>
                    <td id="taskPriority" className="task-info-content">
                      {task.priority}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td id="taskStatus" className="task-info-content">{task.status}</td>
                  </tr>
                  <tr>
                    <td><strong>Deadline:</strong></td>
                    <td id="taskDeadline" className="task-info-content">{formatDate(task.deadline)}</td>
                  </tr>
                  <tr>
                    <td><strong>Completed At:</strong></td>
                    <td id="taskCompletedAt" className="task-info-content">
                      {task.completedAt ? formatDate(task.completedAt) : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Date Created:</strong></td>
                    <td id="taskDateCreated" className="task-info-content">{formatDate(task.createdAt)}</td>
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
