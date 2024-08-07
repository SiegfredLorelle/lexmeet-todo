import { useState } from 'react';
import CreateTaskModal from '../components/CreateTaskModal';
import { loadTasksFromLocalStorage } from "../utils/localStorageUtils";

const CreateTask = ({ children, handleNewTask }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const openTaskModal = () => setIsTaskModalOpen(true);
  const closeTaskModal = () => setIsTaskModalOpen(false);

  const handleCreateTaskSubmit = (taskData) => {
    const getFormattedDateTime = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const tasks = loadTasksFromLocalStorage();
    const newTask = {
      id: tasks.length + 1,
      status: 'Incomplete',
      createdAt: getFormattedDateTime(),
      completedAt: null,
      ...taskData,
    };
    handleNewTask(newTask); // Call the passed function to update tasks state in Tasks component
  };

  return (
    <>
      <button onClick={openTaskModal}>{children}</button>
      <CreateTaskModal isOpen={isTaskModalOpen} onClose={closeTaskModal} onSubmit={handleCreateTaskSubmit} />
    </>
  );
};

export default CreateTask;
