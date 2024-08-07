import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EditTaskModal = ({ isOpen, onClose, task, onSubmit }) => {
  const [taskData, setTaskData] = useState({
    name: task.name,
    description: task.description,
    priority: task.priority,
    deadline: task.deadline,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task.id, taskData);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal edit-task-modal" id="editTaskModal">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="modal-content">
          <h2 className="modal-title">Edit Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="taskName">Name</label>
              <input
                type="text"
                id="taskName"
                name="name"
                value={taskData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Description</label>
              <textarea
                id="taskDescription"
                name="description"
                value={taskData.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskPriority">Priority</label>
              <select
                id="taskPriority"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="taskDeadline">Deadline</label>
              <input
                type="datetime-local"
                id="taskDeadline"
                name="deadline"
                value={taskData.deadline}
                onChange={handleChange}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="submit">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTaskModal;
