import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CreateTaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium'); // Default to medium

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const utcYear = now.getFullYear();
      const utcMonth = now.getMonth();
      const utcDate = now.getDate();
      const defaultDeadline = new Date(Date.UTC(utcYear, utcMonth, utcDate, 23, 59));
      setDeadline(defaultDeadline.toISOString().slice(0, 16));
    } 
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskData = { name, description, deadline, priority };
    onSubmit(taskData);

    // Clear the fields after submitting
    setName('');
    setDescription('');
    setDeadline('');
    setPriority('medium'); // Reset to default value

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="modal-content">
          <h2>Create Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="taskName">Task Name</label>
              <input
                autoFocus
                type="text"
                id="taskName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Task Description</label>
              <textarea
                id="taskDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                type="datetime-local"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <button type="submit">Create Task</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTaskModal;
