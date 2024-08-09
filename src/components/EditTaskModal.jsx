import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EditTaskModal = ({ isOpen, onClose, task, onSubmit }) => {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    priority: '',
    deadline: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setTaskData({
        name: task.name,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
      });
      setErrors({}); // Reset errors when task changes
    }
  }, [task]);

  const validateInputs = () => {
    const newErrors = {};

    if (!taskData.name.trim()) {
      newErrors.name = "Task name cannot be empty or just whitespace.";
    }

    const deadlineDate = new Date(taskData.deadline);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 50);

    if (deadlineDate > maxDate) {
      newErrors.deadline = "Deadline cannot be too far away.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...taskData,
      name: taskData.name.trim(),
      description: taskData.description.trim(),
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                autoFocus
                type="text"
                id="taskName"
                name="name"
                value={taskData.name}
                onChange={handleChange}
                maxLength={100} // Limit to 100 characters
                required
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Description</label>
              <textarea
                id="taskDescription"
                name="description"
                value={taskData.description}
                onChange={handleChange}
                maxLength={100} // Limit to 100 characters
              />
              {errors.description && <p className="error-message">{errors.description}</p>}
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
              {errors.deadline && <p className="error-message">{errors.deadline}</p>}
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
